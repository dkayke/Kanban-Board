import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Board from './pages/Board';

const DashboardModule: FC = () => {
  return (
    <Switch>
      <Route exact path="/kanban" component={Board} />
    </Switch>
  );

};

export default DashboardModule;
