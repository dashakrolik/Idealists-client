import React from 'react';

export const auth = {
  loggedIn: false,
  token: null,
};

export const AuthContext = React.createContext(auth);