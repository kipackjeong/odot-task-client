import React from "react";
import toDoListStyle from "../ToDoList.module.css";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

function ToDoItem(props: any) {
  const { toDo, checked, checkToggle } = props;
  const labelId = `checkbox-list-label-${toDo.id}`;
  return (
    <ListItem
      key={toDo.id}
      className={toDoListStyle["list-item"]}
      secondaryAction={
        <IconButton edge="end" aria-label="comments"></IconButton>
      }
      disablePadding
    >
      <ListItemButton
        sx={{ textAlign: "center" }}
        role={undefined}
        onClick={checkToggle(toDo)}
        dense
      >
        <ListItemIcon sx={{ columnWidth: "10rem" }}>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={labelId}
          primary={`${toDo.title}`}
        />
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={labelId}
          primary={`${toDo.description}`}
        />
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={labelId}
          primary={`${toDo.dueDate}`}
        />
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={labelId}
          primary={`${toDo.priority}`}
        />
        {/*  */}
      </ListItemButton>
    </ListItem>
  );
}

export default ToDoItem;
