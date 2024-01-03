import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Route as RouteEnum } from './enums';
import { LoginFeature, TodoFeature } from './features';
import { ProtectedRoute } from './components';
import AuthProvider from './providers/AuthProvider';

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path={RouteEnum.app}
					element={
						<ProtectedRoute>
							<TodoFeature />
						</ProtectedRoute>
					}
				/>
				<Route path={RouteEnum.logIn} element={<LoginFeature />} />
				<Route path="*" element={<Navigate to={RouteEnum.app} />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
