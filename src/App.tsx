import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavigationBar, NavigationLink } from './components/Navigation';
import { Home, Episodes, Episode, Characters, Character, Locations } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <NavigationBar>
          <NavigationLink to="/">Home</NavigationLink>
          <NavigationLink to="/episodes">Episodes</NavigationLink>
          <NavigationLink to="/characters">Characters</NavigationLink>
          <NavigationLink to="/locations">Locations</NavigationLink>
        </NavigationBar>
      </header>
      <Switch>
        <Route path="/episodes/:id" component={Episode} />
        <Route path="/episodes" component={Episodes} />
        <Route path="/characters/:id" component={Character} />
        <Route path="/characters" component={Characters} />
        <Route path="/locations" component={Locations} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
