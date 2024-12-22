import React, { useCallback } from 'react';
import './App.css';
import Logo from './Logo';
import Button from '@mui/material/Button';

const App = () => {

  const goToReactGuide = useCallback(() => {
    window.location.replace("https://reactjs.org");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button variant="contained" onClick={goToReactGuide}  className="App-link" >Learn React</Button>
      </header>
    </div>
  );
}

export default App;
