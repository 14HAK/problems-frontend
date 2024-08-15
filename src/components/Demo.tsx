import React from 'react';
type Tname = string;

interface DemoProps {
  name: Tname;
}
const Demo: React.FC<DemoProps> = ({ name }) => {
  return (
    <>
      <div>
        <h2 className='text-2xl'>demo component here</h2>
        <p>{name}</p>
      </div>
    </>
  );
};

export default Demo;
