import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <Box className={classes.root} component="header">
      <Typography variant="h3" component="h3">
        things to do
      </Typography>
    </Box>
  );
}

export default Header;
