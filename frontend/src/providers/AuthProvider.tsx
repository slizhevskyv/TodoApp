import React, { createContext, useMemo, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CircularProgress } from '@mui/material';
import { APIService } from '../services';
import { User } from '../types';
import { Cookie } from '../enums';

export const AuthContext = createContext<{
	user: User | null;
	login: () => void;
	logout: () => void;
	autologin: () => void;
}>({
	user: null,
	login: () => {},
	logout: () => {},
	autologin: () => {},
});

interface IProps {
	children: React.ReactNode;
}

function AuthProvider(props: IProps) {
	const { children } = props;
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const login = async () => {
		setIsLoading(true);
		const userData = await APIService.instance.createUser();

		setUser(userData);
		setIsLoading(false);

		navigate('/app');
	};

	const logout = () => {
		Cookies.remove(Cookie.SESSION_ID);

		setUser(null);

		navigate('/', { replace: true });
	};

	const autologin = async () => {
		const sessionId = Cookies.get(Cookie.SESSION_ID);

		if (!sessionId) return;

		setIsLoading(true);
		const userData = await APIService.instance.getUser();

		setUser(userData);
		setIsLoading(false);
		navigate('/app');
	};

	const value = useMemo(
		() => ({
			user,
			login,
			logout,
			autologin,
		}),
		[user],
	);

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} /> : children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
