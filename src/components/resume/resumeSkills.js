import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function renderSkillLineItem({domain, values}) {
  return (
    <li>
      <b className="capitalize">{domain}</b>: {values.join(", ")}
    </li>
  );
}

function Skills() {
  const { allSkillType } = useStaticQuery(query);
  return (
    <div>
      <div className="text-base">Skills</div>
      <ul className="list-disc list-inside text-sm leading-snug">
        {allSkillType.nodes.map(renderSkillLineItem)}
      </ul>
    </div>
  );
}

export default Skills;

const query = graphql`
  query Skills {
    allSkillType {
      nodes {
        domain
        values
      }
    }
  }
`;
