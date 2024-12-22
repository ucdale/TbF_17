import React, { useCallback, useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import Logo from './Logo';
import Button from '@mui/material/Button';
import AppHeader from './AppHeader';
import AppRouter from './AppRouter';

const App = () => {

  const [users, setUsers] = useState<{id:string, name:string}[] | null>(null);

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  };

  const ottieniUsers = useCallback(async () => {
    const data = await getUser();
    if (data) {
      setUsers(data);
    }
  }, []);

  useEffect(() => {
    if(!users){
      setTimeout(() => {  ottieniUsers(); }, 1000);
    }
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <AppRouter />
      {users && (
        <div>
          <h1>Users</h1>
          {users.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
