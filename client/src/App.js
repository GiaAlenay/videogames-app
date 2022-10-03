import './App.css';
import React from 'react';
import {Route} from 'react-router-dom'
import {Landing} from './components/Landing/Landing';
import {Home} from './components/Home/Home'
import{About} from './components/About/About'
import{Create} from './components/Create/Create'
import{Detail} from './components/Detail/Deatail'

function App() {
  return (
    <div className="App">
     <React.Fragment>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route excat path='/about' component={About}/>
      <Route exact path='/videogames/:id' component={Detail}/>
      <Route exact path='/create' component={Create}/>
      </React.Fragment> 
    </div>
  );
}

export default App;
