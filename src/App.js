import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
