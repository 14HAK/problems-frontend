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

type TNAME = string;

interface AppProps {
  name: TNAME;
}

const App: React.FC<AppProps> = ({ name }) => {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{name}</p>
    </div>
  );
};

export default App;
```



<!-- ## api end points:
```javascript

// use enum in main interface
-----------------------------
app
  .use('/api', router)..;
``` -->