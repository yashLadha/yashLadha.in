import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {Container, Button} from 'components/common';
import dev from 'assets/illustrations/skills.svg';
import {Wrapper, SkillsWrapper, Details, Thumbnail} from './styles';

export const Skills = () => (
  <Wrapper id="about">
    <SkillsWrapper as={Container}>
      <Thumbnail>
        <img
          src={dev}
          alt="I’m Yash and I’m a Software Development engineer!"
        />
      </Thumbnail>
      <Details>
        <h1>Hi There!</h1>
        <p>
          I have experience in working on Mobile and Web platform. In past have
          worked on backend frameworks like Django, flask and expressJS.
        </p>
        <Button as={AnchorLink} href="#contact">
          Hire me
        </Button>
      </Details>
    </SkillsWrapper>
  </Wrapper>
);
