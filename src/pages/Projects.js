import ProjectsList from "./repoList";

const projectCard = (project) => {
  return (
    <a className="bg-gray-50" href={project.htmlURL} target="_blank" rel="noreferrer nofollow">
      <div className="transition-shadow ease-in-out duration-500 h-full rounded overflow-hidden shadow-md hover:shadow-xl mb-4">
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
  return (
    <>
      <div className="grid p-3 md:p-0 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-max md:grid-cols-2 gap-3">
        {ProjectsList.map(projectCard)}
      </div>
      <button className="transition duration-300 ease-out hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 bg-blue-400 p-3 text-white shadow-lg relative left-1/2 rounded-3xl">
        <a href="https://github.com/yashLadha" target="_blank" rel="noreferrer">
          Find More...
        </a>
      </button>
    </>
  );
}

export default Projects;
