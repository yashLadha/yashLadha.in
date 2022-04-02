import React from "react";
import EDUCATION_INFO from "../../../static/educationInfo";

function renderEducationDetails(educationDetails) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="font-semibold text-base">{educationDetails.name}, {educationDetails.course}</div>
        <div className="italic text-xs">CGPA: {educationDetails.grade}</div>
      </div>
      <div>{educationDetails.location}</div>
    </div>
  );
}

function Education() {
  return (
    <div>
      <div className="text-base font-light">Education</div>
      <ul className="list-disc list-inside text-sm leading-snug">
      {EDUCATION_INFO.map(renderEducationDetails)}
      </ul>
    </div>
  );
}

export default Education;
