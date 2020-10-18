import React from 'react';
import Routes from './routes';
import SnackbarProvider from 'react-simple-snackbar'

import 'leaflet/dist/leaflet.css'
import './styles/global.css'

function App() {
  return (
    <SnackbarProvider>
      <Routes />
    </SnackbarProvider>
  );
}

export default App;
