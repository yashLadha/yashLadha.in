import StyledLink from "./widgets/Link";

function AboutMe() {
  return (
    <div className="px-2 md:px-0 font-regular leading-relaxed">
      <p className="mb-4 md:relative">
        Hi there 👋. I am a Software Engineer currently working with{" "}
        <StyledLink text="Amazon 🚀" href="https://amazon.com" />, previously was part of the
        rocket ship{" "}
        <StyledLink href="https://www.browserstack.com/" text="BrowserStack" />.
        Along with working on my day job, I am also part of the team that
        maintains the{" "}
        <StyledLink href="https://github.com/nodejs/node" text="NodeJS" /> core
        project.
      </p>
      <p className="mb-4 md:relative">
        You can check out my{" "}
        <StyledLink isBlank={false} href="/projects" text="projects" /> and
        other open source work on Github{" "}
        <StyledLink href="https://github.com/yashLadha" text="@yashLadha" />.
      </p>
    </div>
  );
}

export default AboutMe;
