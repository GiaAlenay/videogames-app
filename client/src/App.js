import './App.css';
import React from 'react';
import {Route} from 'react-router-dom'
import {Landing} from './components/Landing/Landing';
import {Home} from './components/Home/Home'
import{About} from './components/About/About'
import{Create} from './components/Create/Create'
import{Detail} from './components/Detail/Deatail'
import {PagenotFound} from './components/pageNotFound/PagenotFound'
import{Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
     <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route excat path='/about' component={About}/>
      <Route path='/videogames/:id' component={Detail}/>
      <Route exact path='/create' component={Create}/>
      <Route  component={PagenotFound} />
      </Switch> 
    </div>
  );
}

export default App;
