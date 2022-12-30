import React, { useState, useEffect, useRef } from "react";
import Sidenav from "./Sidenav";
import { Switch } from "@headlessui/react";
import { useOnClickOutside } from "../utils/ClickOutside";
import { LaunchIcon } from "../icons";

const Header = () => {
  const ref = useRef();
  //hooks
  const [nav, setNav] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState(null);
  //utils
  useOnClickOutside(ref, () => setNav(false));

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setEnabled(!enabled);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div ref={ref}>
      <div className='flex z-50 flex-row items-center relative drop-shadow-md justify-between w-screen h-10 bg-gray-600 dark:bg-gray-800'>
        <div
          onClick={() => {
            setNav(!nav);
          }}
          className='text-gray-100 ml-4 cursor-pointer'
        >
          <LaunchIcon />
        </div>

        <div className='flex flex-row items-center justify-end'>
          <div className='flex mr-4'>
            <Switch.Group>
              <Switch.Label
                passive
                className='mr-4 text-gray-300 font-montserrat'
              >
                Switch Mode
              </Switch.Label>
              <Switch
                checked={enabled}
                onChange={handleThemeSwitch}
                className={`${
                  enabled ? "bg-gray-700" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </Switch.Group>
          </div>
        </div>
      </div>
      {nav && <Sidenav />}
    </div>
  );
};

export default Header;
