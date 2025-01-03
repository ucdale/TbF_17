import React from 'react';
import { Route, Routes } from 'react-router';
import { ROUTES } from './models/routes';
import Home from './pages/home/Home';
import Leaderboards from './pages/leaderboards/Leaderboards';
import Manage from './pages/manage/Manage';

type AppRouterProps = {};

const AppRouter: React.FC<AppRouterProps> = () => {
  // const { configApplicazione } = useContext(ConfigApplicazioneContext);

  const HomeComponent = <Home />;
  const LeaderboardsComponent = <Leaderboards />;
  const ManageComponent = <Manage />;

  return (
    <Routes>
      <Route path={ROUTES.HOME.path} element={HomeComponent} />
      <Route path={ROUTES.LEADERBOARDS.path} element={LeaderboardsComponent} />
      <Route path={ROUTES.MANAGE.path} element={ManageComponent} />
    </Routes>
  );
};
export default AppRouter;
