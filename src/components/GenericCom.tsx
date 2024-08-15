import React from 'react';

interface TGENERICPROPS<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
}

const GenericCom = <T,>({ items, render }: TGENERICPROPS<T>) => {
  return (
    <>
      <div>
        <ul>
          {items?.map((item, index) => (
            <li key={index}>{render(item)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GenericCom;
