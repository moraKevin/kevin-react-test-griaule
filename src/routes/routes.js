import React from 'react';
import { Route as ReactDOMRoute } from 'react-router-dom';

const Route = ({ component: Component }) => {

  return (
    <ReactDOMRoute
      render={() => <Component />}
    />
  );
};

export default Route;
