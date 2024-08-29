# Project Setup::
## vite + tailwind + React-router-dom + ReduxToolkit & RTK query:
```javascript
  npm create vite@latest // vite

  npm install -g tailwindcss //tailwindCss
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

  npm install react-router-dom //react router dom

  npm install redux //redux toolkit & RTK query
  npm install react-redux
  npm install @reduxjs/toolkit
  npm install redux-persist

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
# Install Shadcn UI:
[ShadCn Component Library](https://ui.shadcn.com/docs/installation)
```js
[Link](https://ui.shadcn.com/docs/installation)
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

# Redux-Toolkit [Advanced]::
## Folder Structure:
```javascript
    src/
    ├── store.ts
    ├── hooks.ts
    ├── api/
    │   ├── baseApi.ts
    │
    ├── features/
    │   ├── auth/
    │       ├── authApi.ts //inject Api.
    │       ├── authSlice.ts
  ```

## baseApi setup:
```javascript
// api.ts or baseApi.ts:
----------
  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
  import type { RootState } from './store';

  //Define a custom base query with token management (from previous explanation)
  const baseQuery = fetchBaseQuery({
    baseUrl: '/api', // Replace with your actual API base URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; // Replace with actual token management logic
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  //A custom base query is created by defining a function that makes HTTP requests and processes responses. We'll use this to add authorization headers and handle token refreshing.
  const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      //Unauthorized, try to refresh the token
      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

      if (refreshResult.data) {
        //Store the new token
        api.dispatch(setCredentials({ token: refreshResult.data.accessToken }));

        //Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        //Refresh failed, redirect to login
        api.dispatch(logout());
      }
    }
    return result;
  };

  //Create API slice using the custom base query
  const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    credentials: 'include', //get all cookie access.
    tagTypes: ['DEMO1', 'DEMO2'],
    endpoints: (builder) => ({
      getProducts: builder.query<CartItem[], void>({
        query: () => '/products',  //Fetch list of products
        providesTags: ['DEMO1'], //its define that DEMO1 his her identity cash data name.
      }),
      addCartItem: builder.mutation<CartItem, Partial<CartItem>>({
        query: (item) => ({
          url: '/cart',
          method: 'POST',
          body: item,
          invalidatesTags: ['DEMO1'], //after mutation then refetch data named providesTags: ['DEMO1']
        }),
      }),
    }),
  });

  export const { useGetProductsQuery, useAddCartItemMutation } = api;
  export default api;
```

## setup injected endPoints setup:
```javascript
// injectEndpoints:
// userApi.ts:
-----------------
  import api from './api'; //Import the base API slice created earlier

  //Dynamically inject endpoints into the existing API slice
  const extendedApi = api.injectEndpoints({
    endpoints: (builder) => ({
      getUser: builder.query<User, number>({
        query: (id) => `user/${id}`,
      }),
      updateUser: builder.mutation<User, Partial<User>>({
        query: (user) => ({
          url: `user/${user.id}`,
          method: 'PUT',
          body: user,
        }),
      }),
    }),
    overrideExisting: false, //Set to false to avoid overriding any existing endpoints
  });

  //Export hooks for the injected endpoints
  export const { useGetUserQuery, useUpdateUserMutation } = extendedApi;
  
```
## slice setup:
```javascript
// cartSlice.ts:
----------------
  import { createSlice, PayloadAction } from '@reduxjs/toolkit';

  interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }

  interface CartState {
    items: CartItem[];
  }

  const initialState: CartState = {
    items: [],
  };

  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      },
      removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      },
      clearCart: (state) => {
        state.items = [];
      },
    },
  });

  export const { addItem, removeItem, clearCart } = cartSlice.actions;
  export const cartItemsByDefault = (state: RootState) => state.items; // state data separate export
  export default cartSlice.reducer; 
```
## store setup:
```javascript
// store.ts:
------------
  import { configureStore } from '@reduxjs/toolkit';
  import { setupListeners } from '@reduxjs/toolkit/query';
  import { api } from './api'; // Assuming this is your RTK Query API slice
  import cartReducer from './features/cartSlice'; // Demo cart slice

  //Create the Redux store and add the RTK Query middleware
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,  // RTK Query API reducer
      cart: cartReducer, // Demo cart slice reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

  //Setup listeners for refetching on focus or reconnect
  setupListeners(store.dispatch);

  //Define RootState and AppDispatch types
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export default store;
```

## setup redux types Hooks:
```javascript
// hooks.ts:
------------
  import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
  import type { RootState, AppDispatch } from './store';

  //Use throughout your app instead of plain `useDispatch` and `useSelector`
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## main.tsx, connect redux with react frontEnd:
```javascript
// main.tsx:
------------
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { Provider } from 'react-redux';
  import { PersistGate } from 'redux-persist/integration/react';
  import App from './App';
  import { store, persistor } from './store';
  import './index.css';

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
```

## title:
```javascript
// ProductList.tsx:
-------------------
  import React from 'react';
  import { useGetProductsQuery, useAddCartItemMutation } from './api';
  import { useAppDispatch } from './hooks';
  import { addItem } from './features/cartSlice';

  const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data: products, error, isLoading } = useGetProductsQuery();
    const [addCartItem] = useAddCartItemMutation();

    const handleAddToCart = async (product: any) => {
      try {
        //Add item to local Redux state
        dispatch(addItem({ id: product.id, name: product.name, quantity: 1, price: product.price }));

        //Send the updated cart item to the server
        await addCartItem({ id: product.id, name: product.name, quantity: 1, price: product.price }).unwrap();
        console.log('Item added to cart successfully');
      } catch (error) {
        console.error('Failed to add item to cart', error);
      }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div>
        <h2>Product List</h2>
        <ul>
          {products?.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default ProductList;
```


## title:
```javascript
// UserDetails.tsx:
-------------------
  import React from 'react';
  import { useGetUserQuery, useUpdateUserMutation } from './userApi';

  const UserDetails: React.FC<{ userId: number }> = ({ userId }) => {
    const { data: user, error, isLoading } = useGetUserQuery(userId);
    const [updateUser] = useUpdateUserMutation();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleUpdateUser = () => {
      updateUser({ id: userId, name: 'Updated Name' });
    };

    return (
      <div>
        {user ? (
          <div>
            <h2>{user.name}</h2>
            <button onClick={handleUpdateUser}>Update User</button>
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>
    );
  };

  export default UserDetails; 
```














<!-- <details>
  <summary>Click me</summary>

  ### Heading
  1. Foo
  2. Bar
     * Baz
     * Qux

  ### Some Javascript
  ```js
  function logSomething(something) {
    console.log('Something', something);
  }
  ```
</details> -->