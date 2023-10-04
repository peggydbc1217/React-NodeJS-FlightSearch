const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const crypto = require("crypto");
const Email = require("../utils/email");

const signToken = (id) => {
  //把id存在token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false, //true for https
    path: "/",
    SameSite: "None",
  };

  //COOKIES塞給瀏覽器 並且裡面存的是JWT
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined; //remove password from output

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// AUTH FUNCTIONS
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // keep in mind this is not a secure way to store password
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  //send email functionality
  const url = `${req.protocol}://${req.get("host")}/me`;
  await new Email(newUser, url).sendWelcome();

  //create a JWT
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  //check if user exists && password is correct
  const currentUser = await User.findOne({ email }).select("+password");
  if (
    !currentUser ||
    !(await currentUser.correctPassword(password, currentUser.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //if everything is ok, send token to client
  createSendToken(currentUser, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true, //不能被瀏覽器改
    path: "/",
  });

  res.status(200).json({ status: "Logout successed" });
};

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt && req.cookies.jwt !== "loggedout") {
    token = req.cookies.jwt;
  }

  if (!token) {
    // no token
    // res.redirect();
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  //2)Verfication token- jwt verify
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return next(
          new AppError(
            "You are not logged in! Please log in to get access.",
            401
          )
        );
      }
    }
  );

  //3)check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  //check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  //let other middleware that have been called after "protect" to access the current user
  req.user = currentUser;

  // This means that when you render a view (using a template engine like EJS or Pug), the currentUser object will be available directly in the template, allowing you to access its properties and data.
  res.locals.user = currentUser;

  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt)
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(
          AppError("The user belonging to this token does not exist.")
        );
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
          AppError("User recently changed password! Please log in again.")
        );
      }

      res.locals.user = currentUser;
      // console.log('res locals====', res.locals);

      // THERE IS A LOGGED IN USER
      return next();
    } catch (err) {
      return next();
    }
};

/////////////PASSWORD RESET/////////////////////

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  //set the reset token and reset token expire time to user
  const resetToken = user.createPasswordResetToken();

  //save the token to the database
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/flightSearch/v1/user/resetPassword/${resetToken}`;

    await new Email(user, resetToken).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined; //delete the token
    user.passwordResetExpires = undefined; //delete the expire time
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

//reset password - used for forget password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //check if the token is expired and if that user exists
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, //check if the token is expired
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  try {
    user.password = req.body.password; //set the new password
    user.passwordConfirm = req.body.passwordConfirm; //set the new passwordConfirm
    user.passwordResetToken = undefined; //delete the token
    user.passwordResetExpires = undefined; //delete the expire time
    await user.save(); //save the user
    // 3) Update changedPasswordAt property for the user
    user.passwordChangedAt = Date.now();

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res, req);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  //check if the current that user type is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  //update the password
  try {
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    //log the user in, send JWT
    createSendToken(user, 200, res, req);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

exports.subscribe = catchAsync(async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      name: "subscriber",
    };

    const sendMail = new Email(user);
    console.log("req.body.email", req.body.email);
    console.log("sendMail.to", sendMail.to);
    sendMail.to = req.body.email;

    await sendMail.sendSubscribe();

    res.status(200).json({
      status: "success",
      message: "You have subscribed to our newsletter!",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
