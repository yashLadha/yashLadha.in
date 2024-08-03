import * as React from "react";
import Layout from "../components/layout";
import StyledLink from "../components/link";

// markup
const IndexPage = () => {
  return (
    <Layout>
      <div className="px-2 md:px-0 font-regular leading-relaxed">
        <p className="mb-4 md:relative">
          Results-driven software developer with expertise in delivering
          high-quality applications that meet business needs. Proven track
          record of developing robust, scalable solutions through collaborative
          projects and open-source initiatives.
        </p>
        <p className="mb-4 md:relative">
          As an experienced engineer, I have a proven track record of developing
          highly scalable solutions that optimize performance and consistently
          meet or exceed expectations. Alongside my professional
          responsibilities, I actively contribute to open-source projects,
          leveraging my technical expertise to support and enrich the broader
          developer community.
        </p>
        <p className="mb-4 md:relative">
          You can check out my{" "}
          <StyledLink isBlank={false} href="/projects" text="projects" /> and
          other open source work on Github{" "}
          <StyledLink href="https://github.com/yashLadha" text="@yashLadha" />.
        </p>
      </div>
    </Layout>
  );
};

export default IndexPage;

export { Head } from "../components/seo";
