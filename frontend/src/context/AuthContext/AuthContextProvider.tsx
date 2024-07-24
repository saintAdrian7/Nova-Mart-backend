
import React, {  useReducer, ReactNode} from 'react';
import {   AuthReducer,AuthContext, initialState,  } from './AuthContextConsts'



export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


