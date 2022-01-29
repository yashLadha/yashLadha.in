import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="mx-auto w-full justify-center flex flex-row">
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <Link to="/">About</Link>
      </div>
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <Link to="/projects">Projects</Link>
      </div>
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <a href="https://blog.yashladha.in/blog" target="_blank" rel="noreferrer">Blog</a>
      </div>
      <div className="capitalize text-blue-700 p-2 m-0 md:m-2">
        <Link to="/works">Contact Me</Link>
      </div>
    </div>
  );
}

export default NavBar;
