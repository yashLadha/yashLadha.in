import React from "react";
import HEADER_INFO from "../../static/resumeHeaderDetails";
import { Helmet } from 'react-helmet';
import Achievements from "../components/resume/achievements";
import JobDetails from "../components/resume/jobDetails";
import Projects from "../components/resume/projects";
import Skills from "../components/resume/skills";
import Line from "../components/line";
import Education from "../components/resume/education";

function renderHeaderDetail(headerInfo) {
  if (headerInfo.isEmail) {
    return (<a href={`mailTo:${headerInfo.name}`}>{headerInfo.name}</a>)
  }
  if (headerInfo.isLink) {
    return (<a href={headerInfo.link}>{headerInfo.name}</a>)
  }

  return (
    <>
      {headerInfo.name}
    </>
  );
}

function Header() {
  const subDetails = HEADER_INFO.map(renderHeaderDetail);
  return (
    <>
      <div className="text-center text-3xl pb-1">Yash Ladha</div>
      <div className="text-center text-sm pb-1">{subDetails}</div>
    </>
  )
}

function Resume() {
  return (
    <>
      <Helmet>
        <meta name={`robots`} content={`noindex, nofollow`} />
      </Helmet>
      <div className="container md:mx-auto w-full p-2 lg:p-0 lg:w-1/2">
        <Header />
        <Line />
        <JobDetails />
        <Line />
        <Skills />
        <Line />
        <Projects />
        <Line />
        <Achievements />
        <Line />
        <Education />
      </div>
    </>
  )
}

export default Resume;
