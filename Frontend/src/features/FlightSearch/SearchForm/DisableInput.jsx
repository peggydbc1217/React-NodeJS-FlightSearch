function DisableInput() {
  return (
    <div class="row">
      <div class="col-12 col-md-6 fs-4 d-flex pe-md-4 mb-5 mb-sm-4 mb-md-3 mb-lg-0">
        <div class="col-3 w-lg-20 d-flex flex-column">
          <label
            for="departure_time"
            name="departure_time"
            id="departure_time"
            class="pt-2 fs-11rem"
          >
            Airline<span class="text-danger">*</span>
          </label>
          <p class="fs-6 mb-0"></p>
        </div>
        <div class="btn-group col-9 w-lg-80">
          <div>
            <div class="dropdown-control-div border border-1 border-secondary d-flex justify-content-between">
              <button type="button" class="btn text-secondary py-2 text-start">
                --未選擇--
              </button>
              <button
                type="button"
                class="btn btn-transparent dropdown-toggle dropdown-toggle-split"
                id="dropdownMenuDepartureTime"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-reference="parent"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
            </div>
            <p class="fs-6 mt-2 mb-0">Coming Soon</p>
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuDepartureTime">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Separated link
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-md-6 fs-4 d-flex pe-md-4 mb-5 mb-sm-4 mb-md-3 mb-lg-0">
        <div class="col-3 w-lg-20 d-flex flex-column">
          <label
            for="departure_time"
            name="departure_time"
            id="departure_time"
            class="pt-2 fs-11rem"
          >
            Time<span class="text-danger">*</span>
          </label>
          <p class="fs-6 mb-0"></p>
        </div>
        <div class="btn-group col-9 w-lg-80">
          <div>
            <div class="dropdown-control-div border border-1 border-secondary d-flex justify-content-between">
              <button type="button" class="btn text-secondary py-2 text-start">
                --未選擇--
              </button>
              <button
                type="button"
                class="btn btn-transparent dropdown-toggle dropdown-toggle-split"
                id="dropdownMenuDepartureTime"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-reference="parent"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
            </div>
            <p class="fs-6 mt-2 mb-0">Coming Soon</p>
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuDepartureTime">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Separated link
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisableInput;
