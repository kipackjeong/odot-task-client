import React from "react";
import todoListStyle from "../TodoList.module.css";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

function todoItem(props: any) {
  const columnWidth = "100px";

  const { todo, checked, checkToggle, idx } = props;
  const labelId = `checkbox-list-label-${todo.id}`;

  return (
    <ListItem
      key={todo.id}
      className={todoListStyle["list-item"]}
      secondaryAction={
        <IconButton edge="end" aria-label="comments"></IconButton>
      }
      disablePadding
    >
      <ListItemButton
        sx={{ padding: 0, textAlign: "center" }}
        role={undefined}
        onClick={checkToggle(idx)}
        dense
      >
        <ListItemIcon sx={{ columnWidth }}>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ columnWidth }}
          id={labelId}
          primary={`${todo.task}`}
        />

        <ListItemText
          sx={{ columnWidth }}
          id={labelId}
          primary={`${todo.dueDate}`}
        />
        <ListItemText
          sx={{ columnWidth }}
          id={labelId}
          primary={`${todo.priority}`}
        />
        {/*  */}
      </ListItemButton>
    </ListItem>
  );
}

export default todoItem;
