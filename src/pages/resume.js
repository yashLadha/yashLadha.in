import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Achievements from "../components/resume/resumeAchievements";
import WorkExperience from "../components/resume/workExperience";
import ResumeProjects from "../components/resume/resumeProjects";
import Skills from "../components/resume/resumeSkills";
import Line from "../components/line";
import Education from "../components/resume/resumeEducation";

function renderHeaderDetail(headerInfo) {
  if (headerInfo.isEmail) {
    return <a href={`mailTo:${headerInfo.name}`}>{headerInfo.name}</a>;
  }
  if (headerInfo.isLink) {
    return <a href={headerInfo.link}>{headerInfo.name}</a>;
  }

  return <>{headerInfo.name}</>;
}

function Header() {
  const { allPersonalDetailType } = useStaticQuery(query);
  return (
    <>
      <div className="text-center text-3xl pb-1">Yash Ladha</div>
      <div className="text-center text-xs pb-1">
        {allPersonalDetailType.nodes.map(renderHeaderDetail)}
      </div>
    </>
  );
}

const resumeSections = [
  <WorkExperience />,
  <Skills />,
  <ResumeProjects />,
  <Achievements />,
  <Education />,
];

function Resume() {
  return (
    <>
      <div className="font-['Gill_Sans'] print:font-['Gill_Sans'] print:text-sm container md:mx-auto w-full p-2 lg:p-0 lg:w-1/2 leading-snug">
        <Header />
        {resumeSections.map((section, index) => (
          <div key={index}>
            <Line />
            {section}
          </div>
        ))}
      </div>
    </>
  );
}

export default Resume;

export function Head() {
  return (
    <>
      <title>Resume</title>
      <meta name={`robots`} content={`noindex, nofollow`} />
    </>
  );
}

const query = graphql`
  query HeaderDetails {
    allPersonalDetailType {
      nodes {
        name
        link
        isLink
        isEmail
      }
    }
  }
`;
