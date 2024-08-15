import React, { useRef } from 'react';

const UseRefComponent: React.FC = () => {
  const targetReference = useRef<HTMLInputElement>(null);

  const handleReference = () => {
    console.log(targetReference.current);
  };
  return (
    <>
      <input
        className='border border-green-600'
        ref={targetReference}
        type='text'
      />
      <button
        className='border border-green-600 py-2 px-4'
        onClick={handleReference}
      >
        submit reference
      </button>
    </>
  );
};

export default UseRefComponent;
