import React, { useReducer, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faCheckSquare, faSquare, faTrashAlt, faClock } from '@fortawesome/free-regular-svg-icons'
import { faSquare as faSolidSquare, faUser, faSort } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ModalProvider } from 'styled-react-modal'
import { defaultTheme } from './constants/Colors';
import { ThemeContext, AuthContext } from './contexts/index';
import {auth} from './services';
import {authReducer} from './reducers';
import MainPage from './components/MainPage/index';

library.add(
  faCheckSquare,
  faSquare,
  faSolidSquare,
  faTrashAlt,
  faUser,
  faGoogle,
  faClock,
  faSort
  )

function App() {
  const [userState, dispatch] = useReducer(authReducer.reducer,authReducer.initialState);
  useEffect(()=>{
    return auth.listenAuthState(dispatch);
  },[]);
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <AuthContext.Provider value={{userState,actions:authReducer.createActions(dispatch)}}>
        <ModalProvider>
          <MainPage />
        </ModalProvider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
