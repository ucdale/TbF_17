import React, { useCallback, useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import Logo from './Logo';
import Button from '@mui/material/Button';
import AppHeader from './AppHeader';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <div className='App'>
      <AppHeader />
      <AppRouter />
    </div>
  );
};

export default App;
