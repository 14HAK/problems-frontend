import React from 'react';

type TNAME = string;

interface DemoProps {
  name: TNAME;
}

const Demo: React.FC = ({ name }) => {
  return (
    <div>
      <h2>this is functional component</h2>
      <p>{name}</p>
    </div>
  );
};

export default Demo;
