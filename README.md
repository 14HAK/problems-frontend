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



## Mapped and Conditional Types:
```javascript
  interface Person 
  {
      name: string;
      age: number;
  }

// Make all properties in Person optional
  type PartialPerson = { //optional of Person
    [K in keyof Person]?: Person[K];
  }

  type PartialPerson = { //compulsory of Person
    [K in keyof Person]: string;
  }

// Conditional type to check if T is a string
---------------------------------------------
  type IsString<T> = T extends string ? 'Yes' : 'No';

  type Test1 = IsString<string>; // 'Yes'
  type Test2 = IsString<number>; // 'No'
```


## React Hooks:
```javascript
// useState()
-------------
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount(count + 1);

  <button onClick={increment}>Increment</button>

// useEffect()
--------------
  const [seconds, setSeconds] = useState<number>(0);
  useEffect(() => {
      const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
  }, 1000);
  return () => clearInterval(interval);
  }, []);
  
  <p>Elapsed Time: {seconds} seconds</p>

// useContext()
---------------
// outside MyContext.tsx
  interface TPERSON {
    name: string;
    age: number;
  }

  const UserContext = createContext<TPERSON | null>();

// inside MyContext.tsx
  const [Person, setPerson] = useState<TPERSON>({
    name: 'dulon mahadi',
    age: 28,
  });

  const ChangePerson = () => {
    setPerson(Person.name === 'Jhon Week');
  };

//when return component in App.tsx
  <UserContext.Provider value={Person, ChangePerson}>
      <App/>
  </UserContext.Provider>

// in component Random.tsx
  const user = useContext(UserContext);
  
  <p>{user?.name} -and- {user?.age}</p>
  <button onClick={ChangePerson}>Change the Person</button>

// Custom Hook (useCustomHook.tsx)
----------------------------------
// its just a custom build hook which is reuseable and fast. always write use(name).tsx like as.
  type UseWindowWidth = () => number;

  const useCustomHook: UseWindowWidth = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
  };

  export default useCustomHook;

// useReducer()
---------------
//both are combination is best way [useContext() and useReducer()]

// outside Reducer.tsx
  interface State {
    count: number;
  }

  interface Action {
    type: 'increment' | 'decrement';
  }

  enum Action = { 
    type = 'increment',
    type = 'decrement',
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  };

// inside MyContext.tsx
  const [state, dispatch] = useReducer(reducer, { count: 0 });

//when return component in App.tsx
  <p>Count: {state.count}</p>
  <button onClick={() => dispatch({ type: 'increment' })}>+</button>
  <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
```

## Higher-Order Components:
```javascript
// useState()
-------------
  const 
```

<!-- ## api end points:
```javascript

// use enum in main interface
-----------------------------
app
  .use('/api', router)..;
``` -->