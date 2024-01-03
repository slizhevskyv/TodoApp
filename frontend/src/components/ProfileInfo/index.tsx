import React from 'react';
import { ButtonBase, Grid, Typography } from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';

function ProfileInfo() {
	const { user, logout } = useAuth();

	return (
		<Grid container marginBottom={3} spacing={3} justifyContent="flex-end" alignItems="center">
			<Grid item>
				<Typography variant="body1">
					Hi, {user?.firstName} {user?.lastName}
				</Typography>
				<Typography variant="caption">{user?.email}</Typography>
			</Grid>
			<Grid item>
				<ButtonBase color="primary" onClick={logout} disableRipple>
					<Typography color="primary" variant="body1">
						Logout
					</Typography>
				</ButtonBase>
			</Grid>
		</Grid>
	);
}

export default ProfileInfo;
