/* import axios from "axios"; */
import React, { useEffect, useState } from "react";

import "../scss/Nav.scss";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY > 100 ? handleShow(true) : handleShow(false)
    );
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2014_logo.svg"
        alt="Netflix Logo"
      />

      <img
        className="nav__avatar"
        src="https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_smart_guy-512.png"
        alt="Avatar Logo"
      />
    </div>
  );
};

export default Nav;
