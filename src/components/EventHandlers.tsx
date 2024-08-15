import React, { MouseEvent } from 'react';

const EventHandlers: React.FC = () => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', event.currentTarget);
  };

  return (
    <>
      <div>
        <p>event control component</p>
        <button
          className='py-2 px-5 bg-red-800 text-white hover:bg-red-600 rounded-md'
          onClick={handleClick}
        >
          click me
        </button>
      </div>
    </>
  );
};

export default EventHandlers;
