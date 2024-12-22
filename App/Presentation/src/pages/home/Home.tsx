import React, { useCallback } from 'react';
import Logo from '../../Logo';
import { Button } from '@mui/material';

const Home: React.FC = () => {
    const goToReactGuide = useCallback(() => {
        window.location.replace("https://reactjs.org");
      }, []);

    return (
        <div>
            <Logo className="App-logo" />
            <p>
            Home page
            </p>
            <Button variant="contained" onClick={goToReactGuide}  className="App-link" >Learn React</Button>
        </div>
    );
};

export default Home;