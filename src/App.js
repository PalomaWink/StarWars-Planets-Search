import React from 'react';
import Table from './component/Table';
import Forms from './component/Forms';
import Provider from './context/Provider';

import './App.css';

function App() {
  return (
    <Provider>
      <Forms />
      <Table />
    </Provider>
  );
}

export default App;
