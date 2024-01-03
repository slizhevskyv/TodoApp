import React, { useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import useStyles from './styles';
import { useAuth } from '../../providers/AuthProvider';

function LoginFeature() {
	const classes = useStyles();

	const { login, autologin } = useAuth();

	useEffect(() => {
		autologin();
	}, []);

	return (
		<Container className={classes.container}>
			<Typography variant="h3">Welcome to Todo App!</Typography>
			<Typography variant="body1">Please, Sign In using button below.</Typography>
			<Button onClick={() => login()} variant="contained" color="primary" size="large">
				Log In
			</Button>
		</Container>
	);
}

export default LoginFeature;
