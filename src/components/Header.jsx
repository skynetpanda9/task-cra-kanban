import React, { useState, useEffect, useRef } from "react";
import Sidenav from "./Sidenav";
import { Switch } from "@headlessui/react";
import { useOnClickOutside } from "../utils/ClickOutside";
import { LaunchIcon } from "../icons";
import { HeaderStyles } from "../styles";

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
      <div className={HeaderStyles.hMain}>
        <div
          onClick={() => {
            setNav(!nav);
          }}
          className={HeaderStyles.hRocket}
        >
          <LaunchIcon />
        </div>

        <div className={HeaderStyles.hSub}>
          <div className='flex mr-4'>
            <Switch.Group>
              <Switch.Label passive className={HeaderStyles.switchLabel}>
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
