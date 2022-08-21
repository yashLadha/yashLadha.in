import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function renderEducationDetails(educationDetails) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="font-semibold text-base">
          {educationDetails.name}, {educationDetails.course}
        </div>
        <div className="italic text-xs">CGPA: {educationDetails.grade}</div>
      </div>
      <div>{educationDetails.location}</div>
    </div>
  );
}

function Education() {
  const { allEducationType } = useStaticQuery(query);
  return (
    <div>
      <div className="text-base font-light">Education</div>
      <ul className="list-disc list-inside text-sm leading-snug">
        {allEducationType.nodes.map(renderEducationDetails)}
      </ul>
    </div>
  );
}

export default Education;

const query = graphql`
  query EducationInfo {
    allEducationType {
      nodes {
        course
        grade
        location
        name
      }
    }
  }
`;
