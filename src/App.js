import React, { useState } from 'react';
import './App.css';
import Detalle from "./organisms/Detalle";
import Error from "./pages/Error";
import Pokemons from "./organisms/Pokemons";
import Spinner from './organisms/Spinner';
import { useSelector } from "react-redux";
import Pelicula from './organisms/Pelicula';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


function App() {

  const [nombre, setNombre] = useState('nn')

  const enviar = e=>{
    console.log(e.target.value);
    setNombre(e.target.value.toUpperCase());
  }
  const { app } = useSelector(state => state);

  const {appName, loading} = app;

  
  return (

    <div className="App">
    {loading &&<Spinner ></Spinner>} 
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/detalle/:id">
            <Detalle />
          </Route>
          <Route path="/pelicula/:id">
            <Pelicula/>
          </Route>
          <Route exact path="/">
            <Pokemons />
          </Route>
          <Route path="/not-found">
          <Error />
        </Route>
        <Route path="*">
          <Redirect from="*" to="/not-found" />
        </Route>
        </Switch>
      </div>
    </Router>
  </div>
    
  );
}

export default App;
