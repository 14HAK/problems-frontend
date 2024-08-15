// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react';
import './App.css';
import GenericCom from './components/GenericCom';
// import BasicPropsTyping from './components/BasicPropsTyping';
// import Demo from './components/Demo';


function App(): JSX.Element {
  const [names] = useState<string[]>([
    'Dulon mahadi molla',
    'Kanan mahadi molla',
    'Nusrat jahan nitu',
  ]);

  return (
    <div>
      <p className='text-xl text-slate-900'>all components here</p>
      <hr />
      {/* <Demo key={'125'} name='khalifa' /> */}
      {/* <BasicPropsTyping key={125} data={{ name: 'Dulon Mahadi', age: 30 }} /> */}
      <GenericCom items={names} render={(item) => <span>{item}</span>} />
    </div>
  );
}

export default App;
