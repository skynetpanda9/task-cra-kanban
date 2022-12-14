import React, { useState, useRef } from "react";
import Sidenav from "./Sidenav";
import Dropdown from "./Dropdown";
import Toggle from "./Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useOnClickOutside } from "../utils/ClickOutside";
import "./index.css";

const Header = () => {
  const ref = useRef();
  //hooks
  const [nav, setNav] = useState(false);
  const [menu, setMenu] = useState(false);
  //utils
  useOnClickOutside(ref, () => setNav(false));
  useOnClickOutside(ref, () => setMenu(false));

  return (
    <div ref={ref}>
      <div className='header'>
        <FontAwesomeIcon
          className='header-icon'
          icon={faRocket}
          size='lg'
          onClick={() => {
            setNav(!nav);
          }}
        />
        <div className='header-asset'>
          <div className='h-a-toggle'>
            <Toggle />
          </div>
          <FontAwesomeIcon
            className='gear-icon'
            icon={faUserGear}
            size='sm'
            onClick={() => setMenu(!menu)}
          />
        </div>
      </div>
      {nav && <Sidenav />}
      {menu && <Dropdown />}
    </div>
  );
};

export default Header;
