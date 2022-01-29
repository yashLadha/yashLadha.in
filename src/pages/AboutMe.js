function AboutMe() {
  return (
    <div className="px-2 md:px-0 font-regular leading-relaxed">
      <p className="mb-4 md:relative">
        Hi there 👋. I am a Software Engineer currently working with Amazon 🚀,
        previously was part of the rocket ship <a className="text-sky-800" href="https://www.browserstack.com/" target="_blank" rel="noreferrer">BrowserStack</a>. Along with working
        on my day job, I am also part of the team that maintains the <a className="text-sky-800" href="https://github.com/nodejs/node" target="_blank" rel="noreferrer">NodeJS</a> core
        project.
      </p>
      <p className="mb-4 md:relative">
        You can check out my{' '}
        <a className="text-indigo-600" href="/projects">
          projects
        </a>{' '}
        and other open source work on Github{' '}
        <a
          className="text-indigo-600"
          href="https://github.com/yashLadha"
          target="_blank"
          rel="noreferrer"
        >
          @yashLadha
        </a>
        .
      </p>
    </div>
  );
}

export default AboutMe;
