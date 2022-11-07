import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//const axios = Axios.create({
//	baseURL: 'http://localhost:8000',
//});

axios.defaults.baseURL = 'http://localhost:8000';

//export default axios;
