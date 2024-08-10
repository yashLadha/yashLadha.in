import React from 'react';

const BasicListSection = (props) => {
  return (
    <div>
      <div className="text-base">{props.name}</div>
      <ul className="list-disc list-inside text-sm leading-snug">
        {props.children}
      </ul>
    </div>
  );
};

export default BasicListSection;
