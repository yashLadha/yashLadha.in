import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BasicListSection from "../basic-list-section";

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
    <BasicListSection name="Education">
      {allEducationType.nodes.map(renderEducationDetails)}
    </BasicListSection>
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
