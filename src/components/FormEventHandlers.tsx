import React, { ChangeEvent, FormEvent, useState } from 'react';

const FormEventHandlers: React.FC = () => {
  const [InputValue, setInputValue] = useState<string>();

  const inputOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`form submitted with value: ${InputValue}`);
  };

  return (
    <>
      <div>FormEventHandlers</div>
      <form onSubmit={handleSubmit}>
        <input
          className='py-2 px-10 border border-green-600 hover:border-orange-400 font-light text-black mr-5 rounded-md'
          type='name'
          value={InputValue}
          placeholder='nick name'
          onChange={inputOnchange}
        />

        <p>
          this is live iput onChange::{' '}
          <span className='font-extrabold'>{InputValue}</span>
        </p>

        <button
          type='submit'
          className='border border-red-300 bg-green-300 py-2 px-3'
        >
          submit
        </button>
      </form>
    </>
  );
};

export default FormEventHandlers;
