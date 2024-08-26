# Project Setup::
## vite + tailwind + React-router-dom + ReduxToolkit & RTK query:
```javascript
  npm create vite@latest // vite

  npm install -g tailwindcss //tailwindCss
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

  npm install react-router-dom //react router dom

  npm install @reduxjs/toolkit react-redux //redux toolkit & RTK query

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
# Basic React::
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
// Higher-Order Components (HOCs) are a pattern in React that allows you to reuse component logic.
  পরে পূরণ করতে হবে...
```

## Code Splitting and Lazy Loading:
```javascript
  // random component Random.jsx
  const Loading: React.FC = () => <div>my component ingredients</div>;

  // App.jsx
  const Random = lazy(() => import('./Random'));

  <Suspense fallback={<p>loading...</p>}>
    <Random/>
  </Suspense>
```
# React Router Dom::
## Router:
```javascript
// Routing
----------
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  
// Navigation
-------------
  <Link to="/">Profile</Link>
  <Link to="/about">Profile</Link>
  <Link to="profile">Profile</Link>
  <Link to="settings">Settings</Link>
  
// Lazy Loading
---------------
  const Home = React.lazy(() => import('./pages/Home'));
  
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}> <Home/> </Suspense>, // in react router
  }

// Dynamic Route
----------------
  const router = createBrowserRouter([
    // Other routes...
    {
      path: "/user/:id",
      element: <User />,
    },
  ]);

  // get the dynamic params id
  <h3>User ID: {id}</h3>
  const { id } = useParams<{ id: string }>();

// Query Parameters [Search]
----------------------------
  const router = createBrowserRouter([
    // Other routes...
    {
      path: "/search",
      element: <Search />,
    },
  ]);

  // get the dynamic search query
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  <p>Search Query: {query}</p>
  <button onClick={() => setSearchParams({ query: 'react' })}>
```

## Redirects and Navigation:
```javascript
// RedirectDemo.tsx
-------------------
  const RedirectDemo = () => {
    const shouldRedirect = true;
    if (shouldRedirect) {
      return <Navigate to="/dashboard" replace = {true} />; 
    }
    return <h3>No Redirect</h3>;
  };
```

## Programmatic Navigation:
```javascript
  const navigate = useNavigate();
  <button onClick={() => navigate('/about')}>Go to About</button>
```
## Scroll Restoration:
```javascript
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
```

## Protected Routes:
```javascript
// ProtectedRoute.tsx
---------------------
  import { Navigate } from 'react-router-dom';
  const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean, children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  export default ProtectedRoute;

// in react router
------------------
   {
    path: "/dashboard",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated = false}>
        <Dashboard/>
      </ProtectedRoute>
   }
```

## Route Guards:
```javascript
// RoleGuard.tsx
---------------------
  import { Navigate } from 'react-router-dom';
  const RoleGuard = ({ role, allowedRoles, children }: { role: string, allowedRoles: string[], children: JSX.Element }) => {
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }
    return children;
  };
  export default RoleGuard;

// in react router
------------------
  {
    path: "/admin",
    element: (
      <RoleGuard role={userRole} allowedRoles={['admin']}>
        <AdminPage />
      </RoleGuard>
    ),
  },
```

## Layout Components:
```javascript
// Layout.tsx
--------------
  const Layout = () => {
    return (
      <div>
        <header>Header</header>
        <main>
          <Outlet />
        </main>
        <footer>Footer</footer>
      </div>
      );
    }

// in react router
------------------
   const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "about", element: <About /> },
        // Other routes...
      ],
    },
  ]);
```




## React-router-dom [ Keywords ]:
```javascript
  createBrowserRouter
  path
  element
  children

  useParams
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  <Navigate to="/dashboard" />
  <Link to="/about">Profile</Link>
  useNavigate()
  <Outlet />
```

# ReduxToolkit::
## full setup:
```javascript
  Document: [REDUX](https://redux-toolkit.js.org/tutorials/typescript)
  Document: [RTK](https://redux-toolkit.js.org/tutorials/typescript)
```
# Redux-Toolkit:
## setup store:
```javascript
// redux/store.ts
-----------------
  import { configureStore } from '@reduxjs/toolkit';

  export const store = configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
      users: usersReducer,
    },
  })

// .TS Types if don't use Redux extra Types hooks
-------------------------------------------------
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch
```

## .TS Types Hook:
```javascript
// redux/hooks.ts
------------------
  import { useDispatch, useSelector } from 'react-redux'
  import type { RootState, AppDispatch } from './store'

  // Use throughout your app instead of plain `useDispatch` and `useSelector`
  export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  export const useAppSelector = useSelector.withTypes<RootState>()
```

## Create Slice [ initialState ]:
```javascript
// redux/features/counterSlice.ts
-----------------------------------------
  import { createSlice } from '@reduxjs/toolkit'
  import type { PayloadAction } from '@reduxjs/toolkit'
  import type { RootState } from '../../app/store'

  // Define a type for the slice state
  interface CounterState {
    value: number
  }

  // Define the initial state using that type
  const initialState: CounterState = {
    value: 0,
  } satisfies CounterState as CounterState

  export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1
      },
      decrement: (state) => {
        state.value -= 1
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
      incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload
      },
    },
  })

  export const { increment, decrement, incrementByAmount } = counterSlice.actions

  // Other code such as selectors can use the imported `RootState` type
  export const selectCount = (state: RootState) => state.counter.value
  export default counterSlice.reducer
```

## Using State && Dispatch Functions:
```javascript
// Counter.tsx
--------------
  import { useAppSelector, useAppDispatch } from 'redux/hooks'
  import { decrement, increment } from 'redux/features/counterSlice'

  export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  <button onClick = {dispatch(increment)}>increment</button>
  <button onClick = {dispatch(decrement)}>decrement</button>
}
```

# RTK-QUERY:
## Create an API service:
```javascript
// in Backend cors() setup.
app.use(cors({ origin: ['http://localhost:5137'], credentials: true }));

// redux/services/pokemon.ts
----------------------------
  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
  import type { Pokemon } from './types'

  export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    credentials: 'include', // get all cookie access.
    tagTypes: ['POKEMON', 'POST'],
    endpoints: (builder) => ({
      getPokemonByName: builder.query<Pokemon, string>({
        query: (name) => `pokemon/${name}`,
        providesTags: ['POKEMON'], // memory that if need to refetch
      }),

      setPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
        invalidatesTags: ['POKEMON'], // after mutation then refetch data named providesTags: ['POKEMON']
      }),
    }),
  })

  // auto-generated based on the defined endpoints
  export const { useGetPokemonByNameQuery, useSetPostMutation } = pokemonApi

// optional [ if need to refetch data for individual fields ]
  ...
     providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'POKEMON', id })), 'POKEMON']
          : ['POKEMON'],
    }),
  ...

  ...
     invalidatesTags: (result, error, arg) => [{ type: 'POKEMON', id: arg.id }],
  ...
```

## setup store:
```javascript
// redux/store.ts
-----------------
  import { confiimport { configureStore } from '@reduxjs/toolkit'// Or from '@reduxjs/toolkit/query/react'
  import { setupListeners } from '@reduxjs/toolkit/query'
  import { pokemonApi } from './services/pokemon'

  export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
  })

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch)
```

## Wrap your application [ Provider ]:
```javascript
// src/main.tsx
-----------------
  import { Provider } from 'react-redux'

  import App from './App'
  import { store } from './store'

  <Provider store={store}>
    <App />
  </Provider>
```

## Use the query:
```javascript
// src/Random.tsx
-----------------
  import { useGetPokemonByNameQuery } from 'redux/services/pokemon';

   // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  console.log(data)
```

<!-- ## api end points:
```javascript

// use enum in main interface
-----------------------------
app
  .use('/api', router)..;
``` -->