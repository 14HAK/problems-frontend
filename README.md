## vite + tailwind +:
```javascript
  npm create vite@latest // vite

  npm install -g tailwindcss // tailwindcss
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

// tailwind.config.js
---------------------
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
 }

// index.css
------------
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

// app.tsx
----------
  <h1 className="text-3xl font-bold underline">
      Hello world!
  </h1>

// CMD
------
  npm run dev



```
## React Functional Component:
```javascript
import React from 'react';

interface TDATA {
  name: string;
  age?: number;
}

interface TBASICPROPS {
  data: TDATA;
}

const BasicPropsTyping: React.FC<TBASICPROPS> = ({ data }) => {
  const { name, age } = data;
  return (
    <div>
      <p>hello, {name}</p>
      <p>age is: {age}</p>
    </div>
  );
};

export default BasicPropsTyping;

// Pass the props
-----------------
<BasicPropsTyping data={{ name: 'kanij fatema', age: 30 }} />
```



<!-- ## api end points:
```javascript

// use enum in main interface
-----------------------------
app
  .use('/api', router)..;
``` -->