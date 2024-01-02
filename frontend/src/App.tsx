import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Route as RouteEnum } from './enums';

function App() {
	return (
		<Routes>
			<Route path={RouteEnum.root} element={<p>Hello world!</p>} />
		</Routes>
	);
}

export default App;
