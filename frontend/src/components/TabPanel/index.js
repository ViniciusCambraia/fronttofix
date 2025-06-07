import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	tabPanel: {
		padding: theme.spacing(2),
		transition: "all 0.3s ease-in-out",
		animation: "$fadeIn 0.3s ease-in-out",
		backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
		borderRadius: "0 0 12px 12px",
		boxShadow: theme.palette.mode === "light" ? "0 2px 10px rgba(0,0,0,0.03)" : "0 2px 10px rgba(0,0,0,0.1)",
		height: "100%",
		overflow: "auto",
	},
	"@keyframes fadeIn": {
		"0%": {
			opacity: 0,
			transform: "translateY(10px)",
		},
		"100%": {
			opacity: 1,
			transform: "translateY(0)",
		},
	},
}));

const TabPanel = ({ children, value, name, ...rest }) => {
	const classes = useStyles();

	if (value === name) {
		return (
			<Box
				role="tabpanel"
				id={`simple-tabpanel-${name}`}
				aria-labelledby={`simple-tab-${name}`}
				className={classes.tabPanel}
				{...rest}
			>
				{children}
			</Box>
		);
	} else return null;
};

export default TabPanel;
