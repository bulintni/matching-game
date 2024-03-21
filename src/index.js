import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='bg-yellow-200 '>
      <App />
    </div>
  </React.StrictMode>
);
