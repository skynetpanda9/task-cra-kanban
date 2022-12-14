import React, { useState, useEffect } from "react";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState(null);

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
    <div className='flex flex-row items-center justify-end'>
      <label className='inline-flex relative items-center mr-1 cursor-pointer'>
        <input
          type='checkbox'
          className='sr-only peer'
          checked={enabled}
          readOnly
        />
        <div
          onClick={() => {
            handleThemeSwitch();
          }}
          className="w-11 h-6 bg-stone-300 rounded-full peer  peer-focus:ring-stone-700  peer-checked:after:translate-x-full peer-checked:after:border-stone-100 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-stone-100 after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-700"
        ></div>
      </label>
    </div>
  );
}
