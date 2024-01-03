import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { Route } from '../../enums';

interface IProps {
	children: React.ReactNode;
}

function ProtectedRoute(props: IProps) {
	const { children } = props;
	const { user } = useAuth();

	if (!user) {
		return <Navigate to={Route.logIn} />;
	}

	return children;
}

export default ProtectedRoute;
