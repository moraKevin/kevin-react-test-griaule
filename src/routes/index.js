import React from "react";
import { Switch } from "react-router-dom";

import Home from "../views/Home/Home";
import Lista from "../views/Lista/Lista";
import Escolha from "../views/Escolha/Escolha";
import NotFound from "../views/NotFound/NotFound";
import Route from "./routes";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Lista" component={Lista} />
    <Route exact path="/Escolha" component={Escolha} />
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
