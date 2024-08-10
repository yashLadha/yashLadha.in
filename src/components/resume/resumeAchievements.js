import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function renderAchievements(achievement) {
  return <li>{achievement}</li>;
}

function Achievements() {
  const { allAchievmentType } = useStaticQuery(query);

  return (
    <div>
      <div className="text-base">Achievements</div>
      <ul className="list-disc list-inside text-sm leading-snug">
        {allAchievmentType.edges[0].node.achievments.map(renderAchievements)}
      </ul>
    </div>
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
