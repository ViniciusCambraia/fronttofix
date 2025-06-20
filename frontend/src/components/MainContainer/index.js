import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		flex: 1,
		padding: theme.spacing(3),
		height: `calc(100% - 48px)`,
		backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : '#1e1e1e',
		transition: 'all 0.3s ease',
	},

	contentWrapper: {
		height: "100%",
		overflowY: "hidden",
		display: "flex",
		flexDirection: "column",
		borderRadius: "12px",
		'& .MuiPaper-root': {
			borderRadius: '12px',
			boxShadow: theme.palette.mode === 'light' ? '0 2px 20px rgba(0,0,0,0.04)' : '0 2px 20px rgba(0,0,0,0.15)',
			overflow: 'hidden',
		},
		'& .MuiTableContainer-root': {
			borderRadius: '12px',
			overflow: 'hidden',
		},
		'& .MuiCard-root': {
			borderRadius: '12px',
			boxShadow: theme.palette.mode === 'light' ? '0 2px 20px rgba(0,0,0,0.04)' : '0 2px 20px rgba(0,0,0,0.15)',
			overflow: 'hidden',
			transition: 'transform 0.3s ease, box-shadow 0.3s ease',
			'&:hover': {
				transform: 'translateY(-4px)',
				boxShadow: theme.palette.mode === 'light' ? '0 10px 25px rgba(0,0,0,0.07)' : '0 10px 25px rgba(0,0,0,0.2)',
			},
		},
	},
}));

const MainContainer = ({ children }) => {
	const classes = useStyles();

	return (
		<Container className={classes.mainContainer} maxWidth="xl">
			<div className={classes.contentWrapper}>{children}</div>
		</Container>
	);
};

export default MainContainer;
