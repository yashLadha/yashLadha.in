import { Switch, Route } from "react-router-dom";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import Works from "./pages/Works";

function Content() {
  return (
    <div className="container mx-auto lg:w-1/2 mt-2 py-6">
      <Switch>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/works">
          <Works />
        </Route>
        <Route path="/">
          <AboutMe />
        </Route>
      </Switch>
    </div>
  );
}

export default Content;
