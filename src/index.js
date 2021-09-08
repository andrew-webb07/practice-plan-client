import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import { PracticePlan } from "./components/PracticePlan.js"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PracticePlan />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);