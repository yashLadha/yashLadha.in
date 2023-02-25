import * as React from "react";
import Layout from "../components/layout";
import StyledLink from "../components/link";

// markup
const IndexPage = () => {
  return (
    <Layout>
      <div className="px-2 md:px-0 font-regular leading-relaxed">
        <p className="mb-4 md:relative">
          Hi there 👋. I am a Software Engineer currently working with{" "}
          <StyledLink text="Amazon 🚀" href="https://amazon.com"/>, previously was part of the
          rocket ship{" "}
          <StyledLink text="BrowserStack" href="https://www.browserstack.com/"/>.
        </p>
        <p className="mb-4 md:relative">
          Along with working on my day job, I also like to work on my side projects that are available on Github.
          I am avid believer in open-source software, and try my best to be active in community. Having said that I am
          also part of the team that maintains the{" "}<StyledLink href="https://github.com/nodejs/node"
                                                                   text="Node.js"/> core
          project.
        </p>
        <p className="mb-4 md:relative">
          You can check out my{" "}
          <StyledLink isBlank={false} href="/projects" text="projects"/> and
          other open source work on Github{" "}
          <StyledLink href="https://github.com/yashLadha" text="@yashLadha"/>.
        </p>
      </div>
    </Layout>
  )
}

export default IndexPage

export {Head} from '../components/seo';
