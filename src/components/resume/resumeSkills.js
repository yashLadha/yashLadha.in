import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BasicListSection from "../basic-list-section";

function renderSkillLineItem({ domain, values }) {
  return (
    <li>
      <span className="capitalize font-semibold">{domain}</span> - {values.join(", ")}
    </li>
  );
}

function Skills() {
  const { allSkillType } = useStaticQuery(query);
  return (
    <BasicListSection name="Skills">
      {allSkillType.nodes.map(renderSkillLineItem)}
    </BasicListSection>
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
