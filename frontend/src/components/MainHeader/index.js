import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	contactsHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "12px 16px",
		backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2a2a2a',
		borderRadius: "10px",
		boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
		margin: "0 0 16px 0",
		"& > *": {
			margin: theme.spacing(0.5),
		},
		"& .MuiButton-root": {
			borderRadius: "8px",
			textTransform: "none",
			fontWeight: 500,
		},
		"& .MuiInputBase-root": {
			borderRadius: "8px",
		},
	},
}));

const MainHeader = ({ children }) => {
	const classes = useStyles();

	return <Paper elevation={0} className={classes.contactsHeader}>{children}</Paper>;
};

export default MainHeader;
