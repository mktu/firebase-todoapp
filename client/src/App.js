import React from 'react';
import { ModalProvider } from 'styled-react-modal'
import { defaultTheme } from './constants/Colors';
import { ThemeContext } from './contexts/index';
import MainPage from './components/MainPage/index';

function App() {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <ModalProvider>
        <MainPage />
      </ModalProvider>
    </ThemeContext.Provider>
  );
}

export default App;
