import React from "react";

function NavBar() {
  return (
    <div className="mx-auto w-full justify-center flex flex-row">
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <a href="/">About</a>
      </div>
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <a href="/projects">Projects</a>
      </div>
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <a href="https://blog.yashladha.in" target="_blank" rel="noreferrer">Blog</a>
      </div>
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <a href="/contactme">Contact Me</a>
      </div>
    </div>
  );
}

export default NavBar;
