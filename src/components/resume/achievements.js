import React from "react";
import ACHIEVEMENTS_INFO from "../../../static/achievementsInfo";

function renderAchievements(achievement) {
  return (
    <li>{achievement}</li>
  )
}

function Achievements() {
  return (
    <div>
      <div className="text-base font-semibold">Achievements</div>
      <ul className="list-disc list-inside text-sm leading-snug">
        {ACHIEVEMENTS_INFO.map(renderAchievements)}
      </ul>
    </div>
  )
}

export default Achievements;
