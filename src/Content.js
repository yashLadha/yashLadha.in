import { Routes, Route } from "react-router-dom";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import Works from "./pages/Works";

function Content() {
  return (
    <div className="container rounded-md border-2 border-blue-700 border-opacity-50 mx-auto p-4 lg:w-1/2 mt-2 py-6">
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/works" element={<Works />} />
        <Route path="/" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default Content;
