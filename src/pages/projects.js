import React from "react";
import {useStaticQuery, graphql} from "gatsby";
import Layout from "../components/layout";
import {NavBarComponent} from "../components/navbar";

const projectCard = (project) => {
  return (
    <a
      className="bg-gray-50"
      href={project.htmlURL}
      target="_blank"
      rel="noreferrer nofollow"
    >
      <div
        className="rounded-lg transition ease-in-out duration-300 transition-background hover:bg-blue-200 hover:bg-opactiy-90 h-full overflow-hidden shadow-sm hover:shadow-lg mb-4">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 inline-flex">
            {project.name}
          </div>
          <p className="text-gray-700 font-light text-base">
            {project.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {project.languages.map((lang) => {
            return (
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                {lang}
              </span>
            );
          })}
        </div>
      </div>
    </a>
  );
};

function Projects() {
  const {allPersonalProject} = useStaticQuery(query);
  return (
    <Layout>
      <div className="grid p-3 md:p-0 lg:grid-cols-3 grid-flow-row auto-rows-max md:grid-cols-2 gap-3">
        {allPersonalProject.nodes.map(projectCard)}
      </div>
      <div className="flex place-content-center mt-5">
        <NavBarComponent>
          <a
            href="https://github.com/yashLadha"
            target="_blank"
            rel="noreferrer"
          >
            Find More...
          </a>
        </NavBarComponent>
      </div>
    </Layout>
  );
}

export default Projects;

const query = graphql`
  query PersonalProjectsList {
    allPersonalProject {
      nodes {
        htmlURL
        languages
        name
        description
      }
    }
  }
`;

export {Head} from "../components/seo";
