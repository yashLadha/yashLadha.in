import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";

const projectCard = (project) => {
  return (
    <a
      className="bg-gray-50"
      href={project.htmlURL}
      target="_blank"
      rel="noreferrer nofollow"
    >
      <div className="rounded-lg ease-in-out duration-500 transition-background transition-opacity hover:bg-blue-100 hover:bg-opactiy-75 h-full overflow-hidden shadow-md hover:shadow-xl mb-4">
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
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
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
  const { allPersonalProject } = useStaticQuery(query);
  return (
    <Layout>
      <div className="grid p-3 md:p-0 lg:grid-cols-3 grid-flow-row auto-rows-max md:grid-cols-2 gap-3">
        {allPersonalProject.nodes.map(projectCard)}
      </div>
      <div className="flex place-content-center mt-5">
        <button className="transition duration-300 ease-out hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 bg-blue-400 p-3 text-white shadow-lg rounded-3xl">
          <a
            href="https://github.com/yashLadha"
            target="_blank"
            rel="noreferrer"
          >
            Find More...
          </a>
        </button>
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

export { Head } from "../components/seo";
