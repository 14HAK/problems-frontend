// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
// import UnionTypeComponent from './components/UnionTypeComponent';
// import UseRefComponent from './components/useRefComponent';
// import FormEventHandlers from './components/FormEventHandlers';
// import EventHandlers from './components/EventHandlers';

// import { useState } from 'react';
// import GenericCom from './components/GenericCom';

// import BasicPropsTyping from './components/BasicPropsTyping';
// import Demo from './components/Demo';

function App(): JSX.Element {
  // const [names] = useState<string[]>(['Dulon','Kanan', 'Nitu']);

  return (
    <div>
      <p className='text-xl text-slate-900'>all components here</p>
      <hr />
      {/* <Demo key={'125'} name='khalifa' /> */}
      {/* <BasicPropsTyping key={125} data={{ name: 'Dulon Mahadi', age: 30 }} /> */}
      {/* <GenericCom items={names} render={(item)=> <span>{item}</span> } /> */}
      {/* <EventHandlers /> */}
      {/* <FormEventHandlers /> */}
      {/* <UseRefComponent /> */}
      {/* <UnionTypeComponent person={{ role: 'user', userName: 'satosi' }} /> */}
    </div>
  );
}

export default App;
