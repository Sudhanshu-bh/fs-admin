import { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { SET_USER } from './actionsList';

function App() {

  const [{ user }, dispatch] = useStateValue()
  const [toast, settoast] = useState({})

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        dispatch({
          type: SET_USER,
          user: authUser
        })
      } else {
        dispatch({
          type: SET_USER,
          user: null
        })
      }
    })
    // eslint-disable-next-line
  }, [])

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
