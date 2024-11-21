import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-around items-center fixed w-full z-10">
      <div className="logo font-bold text-2xl">
        <span className="text-blue-400 ">&lt;</span>
        Safe
        <span className="text-blue-400">Haven/&gt;</span>
      </div>
      <div className="md:flex md:flex-row">
        <span className="text-blue-500 ">&lt;&lt; </span>
        Developed by Atanu
        <span className="text-blue-500 "> &gt;&gt;</span>
      </div>
    </nav>
  );
};

export default Navbar;
