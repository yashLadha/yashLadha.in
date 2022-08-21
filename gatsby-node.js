const { MONTH_ARR } = require("./utils/constants");

function createWorkExperienceNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const { createNode } = actions;
  const jobsInfo = require("./static/jobsInfo.json");
  jobsInfo
    .map((jobDetail) => {
      const [startMonth, startYear] = jobDetail.from.split(" ");
      const startValue = `${startYear}${MONTH_ARR.indexOf(startMonth)}`;
      return {
        ...jobDetail,
        startValue,
      };
    })
    .map((jobDetail) => ({
      ...jobDetail,
      id: createNodeId(
        `jobs-${jobDetail.name}-${jobDetail.role}-${jobDetail.location}`
      ),
      parent: null,
      children: [],
      internal: {
        type: "WorkExperienceType",
        contentDigest: createContentDigest(jobDetail),
      },
    }))
    .forEach((nodeItem) => createNode(nodeItem));
}

function createSkills({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;
  const skillsInfo = require("./static/skillsInfo.json");
  Object.entries(skillsInfo)
    .map(([domain, values]) => ({
      domain,
      values,
      id: createNodeId(`skill-${domain}`),
      parent: null,
      children: [],
      internal: {
        type: "SkillType",
        contentDigest: createContentDigest(domain),
      },
    }))
    .forEach((nodeItem) => createNode(nodeItem));
}

function createEducation({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;
  const education = require("./static/education.json");
  education
    .map((educationInfo) => ({
      ...educationInfo,
      id: createNodeId(`education-${education.name}-${education.course}`),
      parent: null,
      children: [],
      internal: {
        type: "EducationType",
        contentDigest: createContentDigest(educationInfo),
      },
    }))
    .forEach((nodeItem) => createNode(nodeItem));
}

function createAchievments({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;
  const achievmentsInfo = require("./static/achievmentsInfo.json");
  const node = {
    achievments: achievmentsInfo,
    id: createNodeId(`achievments-${achievmentsInfo}`),
    parent: null,
    children: [],
    internal: {
      type: "AchievmentType",
      contentDigest: createContentDigest(achievmentsInfo),
    },
  };
  createNode(node);
}

function createPersonalProjects({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;
  const repoList = require("./static/repoList.json");
  repoList
    .map((repoInfo) => ({
      ...repoInfo,
      id: createNodeId(`gh-repo-${repoInfo.name}`),
      parent: null,
      children: [],
      internal: {
        type: "PersonalProject",
        contentDigest: createContentDigest(repoInfo),
      },
    }))
    .forEach((nodeItem) => createNode(nodeItem));
}

function createPersonalDetails({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;
  const personalDetailsArr = require("./static/headerDetails.json");
  personalDetailsArr
    .map((personalDetail) => ({
      ...personalDetail,
      id: createNodeId(`personal-detail-${personalDetail.name}`),
      parent: null,
      children: [],
      internal: {
        type: "PersonalDetailType",
        contentDigest: createContentDigest(personalDetail),
      },
    }))
    .forEach((nodeItem) => createNode(nodeItem));
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  createSkills({ actions, createNodeId, createContentDigest });
  createWorkExperienceNodes({ actions, createNodeId, createContentDigest });
  createEducation({ actions, createNodeId, createContentDigest });
  createAchievments({ actions, createNodeId, createContentDigest });
  createPersonalProjects({ actions, createNodeId, createContentDigest });
  createPersonalDetails({ actions, createNodeId, createContentDigest });
};
