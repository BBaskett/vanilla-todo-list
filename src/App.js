import React from "react";
import { v4 as uuidv4 } from "uuid";

// Components
import Header from "./Components/Header";
import Todos from "./Components/Todos.js";

// Material UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";
import { grey, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Exo", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#388e3c",
    },
  },
  overrides: {
    MuiCheckbox: {
      root: {
        color: grey[300],
      },
      colorSecondary: {
        "&:hover": {
          backgroundColor: green[50],
        },
        "&$checked": {
          color: green[300],
          "&:hover": {
            backgroundColor: green[50],
          },
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14), 
    0px 1px 3px 0px rgba(0,0,0,0.12), 
    0 -${theme.spacing(4)}px 0 -${theme.spacing(2)}px rgba(255,255,255,0.35),
    0 -${theme.spacing(8)}px 0 -${theme.spacing(4)}px rgba(255,255,255,0.25), 
    0 -${theme.spacing(12)}px 0 -${theme.spacing(6)}px rgba(255,255,255,0.15)`,
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(1),
    "& > span": {
      flex: 1,
      paddingLeft: theme.spacing(2),
    },
  },
  input: {
    flex: 1,
  },
  deactivated: {
    color: theme.palette.error.main,
  },
}));

function App() {
  const classes = useStyles();
  const [inputHasFocus, setInputHasFocus] = React.useState(false);
  const [itemsList, setItemsList] = React.useState([]);
  const [showDeactivated, setShowDeactivated] = React.useState(false);
  React.useEffect(() => {
    if (localStorage && localStorage.getItem("list-items")) {
      setItemsList(JSON.parse(localStorage.getItem("list-items")));
    }
  }, []);
  React.useEffect(() => {
    return localStorage.setItem("list-items", JSON.stringify(itemsList));
  }, [itemsList]);
  function handleUpdate(id, updates) {
    const arrayIndex = itemsList.findIndex((item) => item.id === id);
    return setItemsList([
      ...itemsList.slice(0, arrayIndex),
      { ...itemsList[arrayIndex], ...updates, date_updated: Date.now() },
      ...itemsList.slice(arrayIndex + 1),
    ]);
  }
  function handleKeyPress(event) {
    if (event.key === "Enter" && event.target.value.length !== 0) {
      event.preventDefault();
      setItemsList([
        ...itemsList,
        {
          id: uuidv4(),
          text: event.target.value,
          date_added: Date.now(),
          date_updated: Date.now(),
          completed: false,
          deactivated: false,
          date_deactivated: null,
        },
      ]);
      return (event.target.value = "");
    }
    if (event.key === "Enter" && event.target.value.length === 0) {
      return event.preventDefault();
    }
  }
  function handleReset() {
    const confirmationMessage = window.confirm(
      "Are you sure that you would like to reset the application?"
    );
    if (confirmationMessage) {
      return setItemsList([]);
    }
  }
  function handleDeactivated() {
    return setShowDeactivated(!showDeactivated);
  }
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className={classes.root} maxWidth="lg">
        <Paper component="form" className={classes.paper} square>
          <Box className={classes.box}>
            <Typography variant="body2" component="span">
              Count:&nbsp;
              {
                itemsList.filter((item) => item.deactivated === showDeactivated)
                  .length
              }
            </Typography>
            <Tooltip title="Reset List">
              <IconButton aria-label="button reset" onClick={handleReset}>
                <CachedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Deleted Items">
              <IconButton
                className={showDeactivated ? classes.deactivated : ""}
                aria-label="button restore deleted"
                onClick={handleDeactivated}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {showDeactivated ? (
            ""
          ) : (
            <TextField
              className={classes.input}
              variant="outlined"
              label="Add a new item"
              InputLabelProps={{ shrink: inputHasFocus }}
              inputProps={{ "aria-label": "new item input" }}
              onBlur={(event) => {
                event.target.value = "";
                return setInputHasFocus(false);
              }}
              onFocus={() => setInputHasFocus(true)}
              onKeyPress={handleKeyPress}
              fullWidth
            />
          )}

          <Todos
            list={itemsList}
            update={handleUpdate}
            showDeactivated={showDeactivated}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
