import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

const Projects = lazy(() => import("./pages/Projects"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Works = lazy(() => import("./pages/Works"));
const Loading = () => <div>Loading...</div>;

function Content() {
  return (
    <div className="container rounded-md border-2 border-blue-700 border-opacity-50 mx-auto p-4 lg:w-1/2 mt-2 py-6">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/works" element={<Works />} />
          <Route path="/" element={<AboutMe />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Content;
