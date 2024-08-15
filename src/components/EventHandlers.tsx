import React, { MouseEvent } from 'react';

const EventHandlers: React.FC = () => {
  const handleEvent = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    console.log('event triggered');
  };

  return (
    <>
      <div>
        <p>event controll component</p>
        <button
          className='py-2 px-5 bg-red-800 text-white hover:bg-red-600 rounded-md'
          onClick={() => handleEvent()}
        >
          click me
        </button>
      </div>
    </>
  );
};

export default EventHandlers;
