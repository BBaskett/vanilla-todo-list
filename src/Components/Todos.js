import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Checkbox,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1),
    boxSizing: "border-box",
    "& + div": {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: theme.palette.grey[300],
    },
  },
  text: {
    flex: 1,
    "&:not(:focus) fieldset": {
      borderColor: "transparent",
    },
  },
  icon: {
    color: theme.palette.grey[300],
    transition: "color 0.25s ease-out",
    paddingLeft: theme.spacing(1),
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.error.light,
    },
  },
  restore: {
    color: theme.palette.grey[300],
    transition: "color 0.25s ease-out",
    paddingLeft: theme.spacing(1),
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.success.light,
    },
  },
  empty: {
    margin: theme.spacing(4),
  },
}));

function Todos(props) {
  const classes = useStyles();
  if (props.list.length > 0) {
    return (
      <>
        {props.list
          .filter((item) => item.deactivated === props.showDeactivated)
          .map((item) => (
            <Todo
              isDeactivated={props.showDeactivated}
              key={item.id}
              object={item}
              update={props.update}
            />
          ))}
      </>
    );
  } else {
    return (
      <Typography className={classes.empty} variant="body1" component="p">
        No Items
      </Typography>
    );
  }
}

function Todo(props) {
  const classes = useStyles();
  return (
    <Slide direction="up" in={true}>
      <Box className={classes.root} component="div">
        {props.isDeactivated ? (
          <>
            <TextField
              className={classes.text}
              helperText={`Deleted: ${new Date(
                props.object.date_deactivated
              ).toString()}`}
              FormHelperTextProps={{ margin: "dense" }}
              variant="outlined"
              defaultValue={props.object.text}
              inputProps={{ "aria-label": "edit item input" }}
              onBlur={(event) =>
                props.update(props.object.id, {
                  text: event.target.value,
                })
              }
              multiline
              disabled
            />
            <Tooltip title="Restore item">
              <RestoreIcon
                className={classes.restore}
                onClick={() =>
                  props.update(props.object.id, {
                    deactivated: false,
                    date_deactivated: null,
                  })
                }
              />
            </Tooltip>
          </>
        ) : (
          <>
            <Checkbox
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
              checked={props.object.completed}
              onChange={() =>
                props.update(props.object.id, {
                  completed: !props.object.completed,
                })
              }
              disableRipple={true}
            />
            <TextField
              className={classes.text}
              helperText={`Last Updated: ${new Date(
                props.object.date_updated
              ).toString()}`}
              FormHelperTextProps={{ margin: "dense" }}
              variant="outlined"
              defaultValue={props.object.text}
              inputProps={{ "aria-label": "edit item input" }}
              onBlur={(event) =>
                props.update(props.object.id, {
                  text: event.target.value,
                })
              }
              multiline
            />
            <Tooltip title="Delete Item">
              <CloseIcon
                className={classes.icon}
                onClick={() =>
                  props.update(props.object.id, {
                    deactivated: true,
                    date_deactivated: Date.now(),
                  })
                }
              />
            </Tooltip>
          </>
        )}
      </Box>
    </Slide>
  );
}

export default Todos;
