import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function createJobDetailList(detailInfo) {
  return <li>{detailInfo}</li>;
}

function createJobDetail(jobDetail) {
  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <div className="font-semibold text-sm">
          {" "}
          {jobDetail.name} ({jobDetail.role})
        </div>
        <div className="italic text-xs">
          {jobDetail.from} - {jobDetail.to}
        </div>
      </div>
      <div className="p-1">
        <ul className="list-disc list-inside text-sm leading-tight">
          {jobDetail.details.map(createJobDetailList)}
        </ul>
      </div>
    </div>
  );
}

function WorkExperience() {
  const { allWorkExperienceType } = useStaticQuery(query);
  return (
    <div>
      <div className="text-base"> Work Experience </div>
      {allWorkExperienceType.nodes.map(createJobDetail)}
    </div>
  );
}

export default WorkExperience;

const query = graphql`
  query WorkExperience {
    allWorkExperienceType(sort: { startValue: DESC }) {
      nodes {
        id
        details
        from
        location
        name
        role
        to
      }
    }
  }
`;
