import React, { useReducer, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faCheckSquare, faSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faSquare as faSolidSquare } from '@fortawesome/free-solid-svg-icons'
import { ModalProvider } from 'styled-react-modal'
import { defaultTheme } from './constants/Colors';
import { ThemeContext, AuthContext } from './contexts/index';
import {auth} from './services';
import {authReducer} from './reducers';
import MainPage from './components/MainPage/index';

library.add(faCheckSquare,faSquare,faSolidSquare,faTrashAlt)

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
