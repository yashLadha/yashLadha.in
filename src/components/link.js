import React from 'react';

function StyledLink(props) {
  const { href, text, isBlank = true } = props;

  if (isBlank) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-sky-800">
        {text}
      </a>
    );
  } else {
    return (
      <a href={href} className="text-sky-800">
        {text}
      </a>
    );
  }
}

export default StyledLink;
