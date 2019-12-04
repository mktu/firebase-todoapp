import React, { useReducer, useEffect } from 'react';
import { ModalProvider } from 'styled-react-modal'
import { defaultTheme } from './constants/Colors';
import { ThemeContext, AuthContext } from './contexts/index';
import {auth} from './services';
import {authReducer} from './reducers';
import MainPage from './components/MainPage/index';

function App() {
  const [state, dispatch] = useReducer(authReducer.reducer,authReducer.initialState);
  useEffect(()=>{
    return auth.listenAuthState(dispatch);
  },[]);
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <AuthContext.Provider value={state}>
        <ModalProvider>
          <MainPage />
        </ModalProvider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
