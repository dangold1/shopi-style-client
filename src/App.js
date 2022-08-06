import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppBarComponent from './components/AppBarComponent';
import CategoriesBarComponent from './components/CategoriesBarComponent';
import PagesRoutes from './routes';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppBarComponent />
        <CategoriesBarComponent />
        <PagesRoutes />
      </div>
    </Router>
  );
}

export default App;
