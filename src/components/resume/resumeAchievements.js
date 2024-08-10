import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BasicListSection from "../basic-list-section";

function renderAchievements(achievement) {
  return <li>{achievement}</li>;
}

function Achievements() {
  const { allAchievmentType } = useStaticQuery(query);

  return (
    <BasicListSection name="Achievements">
      {allAchievmentType.edges[0].node.achievments.map(renderAchievements)}
    </BasicListSection>
  );
}

export default Achievements;

const query = graphql`
  query AchievementsInfo {
    allAchievmentType {
      edges {
        node {
          achievments
        }
      }
    }
  }
`;
