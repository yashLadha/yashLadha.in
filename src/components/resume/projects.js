import React from "react";
import PROJECTS_INFO from "../../../static/projectsInfo";

function renderProjects(projectInfo) {
  return (
    <li>
      <a href={projectInfo.link} target="_blank" rel="noreferrer" className="font-bold">{projectInfo.name}</a> : {projectInfo.detail}
    </li>
  );
}

function Projects() {
  return (
    <div>
      <div className="text-base font-semibold">Projects</div>
      <ul className="list-disc list-inside text-sm leading-snug">
        {PROJECTS_INFO.map(renderProjects)}
      </ul>
    </div>
  )
}

export default Projects;
