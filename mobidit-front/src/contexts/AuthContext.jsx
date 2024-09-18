import { createContext, useState } from 'react';
import { UserCreate, UserLogin } from '../services/UserService';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
	const [isAuth, setIsAuth] = useState(false);

	function login (credentials) {
        UserLogin(credentials).then((response) => {
            setUser(response.data)
            setIsAuth(response.succes)
        })
    }

	function register (credentials) {
		UserCreate(credentials).then((response) => {
			setUser(response.data)
			setIsAuth(response.succes)
		})
	}

	return (
		<AuthContext.Provider value={{ user, isAuth, login, register }}>
			{children}
		</AuthContext.Provider>
	);
};