import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Adm from './pages/adm'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exect path="/adm" component={Adm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
