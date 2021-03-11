import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../../routes';

const App = () => {
  return (
    <Router basename="/">
      <div className='app'>
        <Routes />
      </div>
    </Router>
  );
}

export default App;
