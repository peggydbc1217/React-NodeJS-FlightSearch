import React from "react";
import { Nav } from "react-bootstrap"; // Import Bootstrap components
import FooterIcon from "./FooterIcon";
import { v4 as uuidv4 } from "uuid";

const footerIcons = [
  {
    name: "facebook",
    url: "https://www.facebook.com/profile.php?id=100002181591125",
  },
  { name: "instagram", url: "https://www.instagram.com/hohu695847/" },
  { name: "Linkedin", url: "https://www.linkedin.com/in/hsi-chen-a2339b145/" },
];

function FooterIconList() {
  return (
    <Nav className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 d-flex flex-row justify-content-between align-items-center  gap-xl-4">
      {footerIcons.map((icon) => {
        const uniqueId = uuidv4();
        return <FooterIcon imgName={icon.name} url={icon.url} key={uniqueId} />;
      })}
    </Nav>
  );
}

export default FooterIconList;
