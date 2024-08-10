import React from "react";
import PROJECTS_INFO from "../../../static/projectsInfo";
import BasicListSection from "../basic-list-section";

function renderProjects(projectInfo) {
  return (
    <li>
      <a
        href={projectInfo.link}
        target="_blank"
        rel="noreferrer"
        className="font-semibold"
      >
        {projectInfo.name}
      </a> - {projectInfo.detail}
    </li>
  );
}

function ResumeProjects() {
  return (
    <BasicListSection name="Projects">
      {PROJECTS_INFO.map(renderProjects)}
    </BasicListSection>
  );
}

export default ResumeProjects;
