import React from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <p style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center'
        }}>
          Node commerce front end
        </p>
    </div>
  );
}

export default App;
