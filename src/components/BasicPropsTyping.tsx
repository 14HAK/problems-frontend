import React from 'react';

interface TDATA {
  name: string;
  age?: number;
}

interface TBASICTYPING {
  data: TDATA;
}

const BasicPropsTyping: React.FC<TBASICTYPING> = ({ data }) => {
  const { name, age } = data;

  return (
    <>
      <div>
        <h2 className='text-xl mt-10 mx-auto w-11/12 first-letter:text-4xl'>
          BasicPropsTyping component
        </h2>
        <p>hello, {name}</p>
        <p>your age is, {age} years old!</p>
      </div>
    </>
  );
};

export default BasicPropsTyping;
