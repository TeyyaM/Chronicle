// import React from 'react'
import * as S from './components/menu/styles';
// import './styles/App.css';
// import ChronicleLogo from './ChronicleLogo.png';

import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";

import Home from './components/Home';
import Categories from './components/Categories';
import Entries from './components/Entries';
import Settings from './components/Settings';
import Graphs from './components/Graphs';
import Navbar from './components/menu/Navbar';

type Props = {
  open: boolean;
}

function App(props: Props) {

  return (
    <Router>
      <Navbar />
      <S.Ul open={props.open}>
        <S.LogoUl src="images/ChronicleLogo.png" alt="logo" />

        <NavLink to="/categories"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA"
          }}
        > 
          <li>Categories</li>
        </NavLink>
        <NavLink to="/entries"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA"
          }}
        >
          <li>entries</li>
        </NavLink>
        <NavLink to="/settings"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA"
          }}
        >
          <li>Settings</li>
        </NavLink>
        <NavLink to="/graphs"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA"
          }}
        >
          <li>Graphs</li>
          </NavLink>
          <NavLink to="/categories"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA"
          }}
        > 
          <li>Home</li>
        </NavLink>
      </S.Ul>


      <Switch>
        <Route path="/categories" component={Categories} />
        <Route path="/entries" component={Entries} />
        <Route path="/settings" component={Settings} />
        <Route path="/graphs" component={Graphs} >
        <Route path="/home" component={Home} />
        <Redirect to='/' />
        </Route>
      </Switch>
    </Router >
  )
}

export default App;
