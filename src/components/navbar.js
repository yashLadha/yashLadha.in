import React from "react";

export function NavBarComponent({children}) {
  return (
    <div className="capitalize transition duration-300 ease-in-out hover:text-blue-500 hover:font-bold text-blue-700 p-2 m-0 md:m-2">
      {children}
    </div>
  )
}

function NavBar() {
  return (
    <div className="mx-auto w-full justify-center flex flex-row">
      <NavBarComponent>
        <a href="/">About</a>
      </NavBarComponent>
      <NavBarComponent>
        <a href="/projects">Projects</a>
      </NavBarComponent>
      <NavBarComponent>
        <a href="https://blog.yashladha.in" target="_blank" rel="noreferrer">Blog</a>
      </NavBarComponent>
      <NavBarComponent>
        <a href="/contactme">Contact Me</a>
      </NavBarComponent>
    </div>
  );
}

export default NavBar;
