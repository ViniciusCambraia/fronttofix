import React from "react";
import { Typography, Link } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Whaticket
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
