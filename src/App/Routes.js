import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PathfindingVisualizer from './Views/PathfindingVisualizer/PathfindingVisualizer';
import SortingVisualizer from './Views/SortingVisualizer/SortingVisualizer';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/sorting' component={SortingVisualizer} />
      <Route exact path='/pathfinding' component={PathfindingVisualizer} />
      <Redirect to={{ pathname: '/sorting' }} />
    </Switch>
  );
};

export default Routes;
