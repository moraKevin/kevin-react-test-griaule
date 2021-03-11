import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes";
// Estilos dos componentes do PrimeReact
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const App = () => {
  return (
    <Router basename="/">
      <div className="app">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
