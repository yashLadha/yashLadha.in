import React from "react";
import SKILLS_INFO from "../../../static/skillsInfo";

function renderSkillLineItem([skillName, skillValues]) {
  return (
    <li className="capitalize">
      <b>{skillName}</b>: {skillValues.join(', ')}
    </li>
  )
}

function Skills() {
  return (
    <div>
      <div className="text-base font-light">Skills</div>
      <ul className="list-disc list-inside text-sm leading-snug">
        {Object.entries(SKILLS_INFO).map(renderSkillLineItem)}
      </ul>
    </div>
  )
}

export default Skills;
