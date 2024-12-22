import React, { useCallback } from 'react';
import './App.css';
import Logo from './Logo';
import Button from '@mui/material/Button';
import AppHeader from './AppHeader';

const App = () => {

  const goToReactGuide = useCallback(() => {
    window.location.replace("https://reactjs.org");
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Home page
        </p>
        <Button variant="contained" onClick={goToReactGuide}  className="App-link" >Learn React</Button>
      </header>
    </div>
  );
}

export default App;
