import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import toDoListStyle from "../ToDoList.module.css";

function ListHead() {
  return (
    <ListItem
      className={toDoListStyle["list-head"]}
      key={"header1"}
      secondaryAction={
        <IconButton edge="end" aria-label="comments"></IconButton>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        dense
        disabled
        sx={{ textAlign: "center" }}
      >
        <ListItemIcon sx={{ columnWidth: "20%" }}></ListItemIcon>
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={"header1"}
          primary={"Title"}
        />
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={"header1"}
          primary={"Description"}
        />
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={"header1"}
          primary={"Due"}
        />
        <ListItemText
          sx={{ columnWidth: "10rem" }}
          id={"header1"}
          primary={"Priority"}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default ListHead;
