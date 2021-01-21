import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppBarComponent from './components/AppBarComponent/AppBarComponent';
import CategoriesBarComponent from './components/CategoriesBarComponent/CategoriesBarComponent';
import PagesRouts from './routes/PagesRouts';
import './App.css';

const App = props => {
  return (
    <Router>
      <div className="App">
        <AppBarComponent />
        <CategoriesBarComponent />
        <PagesRouts />
      </div>
    </Router>
  );
}

export default App;
