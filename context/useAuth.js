import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

// Creating a context for authentication
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * This component provides authentication-related state and functions
 * to its child components.
 *
 * @param {Object} props - The properties passed to the AuthProvider component.
 * @returns {JSX.Element} - The provider component with authentication context.
 */
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('acc_token');
    setUserToken(token);
  }, []);

  // Sets the user's token in cookies for persistence and updates the state.
  const login = (token) => {
    Cookies.set('acc_token', token); // Setting the token in cookies for persistence
    setUserToken(token); // Updating the state with the new token
  };
  
  // Removes the user's token from cookies and updates the state.
  const logout = () => {
    Cookies.remove('acc_token'); // Removing the token from cookies
    setUserToken(null); // Resetting the state to null upon logout
  };

  // Providing the authentication state and functions to child components
  return (
    <AuthContext.Provider value={{ userToken, setUserToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using authentication context
export const useAuth = () => useContext(AuthContext);
