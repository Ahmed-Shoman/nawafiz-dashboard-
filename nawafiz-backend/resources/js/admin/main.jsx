import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '../bootstrap'; // Laravel's bootstrap (axios etc)
import '../../css/app.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter basename="/admin">
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
