import React, { useCallback } from 'react';
// import './App.css';
import Logo from './Logo';
import Button from '@mui/material/Button';
import AppHeader from './AppHeader';
import AppRouter from './AppRouter';

const App = () => {

  const goToReactGuide = useCallback(() => {
    window.location.replace("https://reactjs.org");
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <AppRouter />
    </div>
  );
}

export default App;
