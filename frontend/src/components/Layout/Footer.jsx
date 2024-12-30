import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  
  return (
    <footer className= "footerShow" >
      <div>&copy; All Rights Reserved By EthioHire.</div>
      <div>
        <Link to={"https://www.facebook.com/notifications/"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/watch?v=oQ9i7XxLe5w"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/feed/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com//"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;