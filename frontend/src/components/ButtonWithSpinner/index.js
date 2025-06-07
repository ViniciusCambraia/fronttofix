import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	button: {
		position: "relative",
		borderRadius: "8px",
		transition: "all 0.3s ease",
		fontWeight: 500,
		textTransform: "none",
		fontSize: "14px",
		padding: "8px 16px",
		"&:hover": {
			transform: "translateY(-2px)",
			boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
		},
		"&.MuiButton-contained": {
			boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
		},
		"&.MuiButton-containedPrimary": {
			backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
		},
		"&.Mui-disabled": {
			backgroundImage: "none",
			opacity: 0.7,
		},
	},

	buttonProgress: {
		color: theme.palette.mode === "light" ? "#ffffff" : theme.palette.primary.light,
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
}))

const ButtonWithSpinner = ({ loading, children, ...rest }) => {
	const classes = useStyles();

	return (
		<Button 
			className={classes.button} 
			disabled={loading} 
			disableElevation={false}
			{...rest}
		>
			{children}
			{loading && (
				<CircularProgress 
					size={20} 
					thickness={4} 
					className={classes.buttonProgress} 
				/>
			)}
		</Button>
	);
};

export default ButtonWithSpinner;
