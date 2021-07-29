import { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { SET_USER } from './actionsList';
import Loading from './components/reusable/Loading';
import AddProduct from './components/AddProduct';
import DeleteProducts from './components/DeleteProducts';

function App() {

  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue()
  const [UserLoginStatus, setUserLoginStatus] = useState(-1)

  useEffect(() => {

    setUserLoginStatus(-1)

    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUserLoginStatus(1)
        dispatch({
          type: SET_USER,
          user: authUser
        })
      } else {
        setUserLoginStatus(0)
        dispatch({
          type: SET_USER,
          user: null
        })
      }
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="app">

        <Switch>
          <Route exact path="/addproduct">
            {UserLoginStatus === -1 && <Loading />}
            {UserLoginStatus === 1 && <AddProduct />}
            {UserLoginStatus === 0 && <Login />}
          </Route>

          <Route exact path="/deleteproducts">
            {UserLoginStatus === -1 && <Loading />}
            {UserLoginStatus === 1 && <DeleteProducts />}
            {UserLoginStatus === 0 && <Login />}
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            {UserLoginStatus === -1 && <Loading />}
            {UserLoginStatus === 1 && <Home />}
            {UserLoginStatus === 0 && <Login />}
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
