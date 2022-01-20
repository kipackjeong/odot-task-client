import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import todoListStyle from "../TodoList.module.css";

function ListHead() {
  const columnWidth = "100px";
  return (
    <ListItem
      className={todoListStyle["list-head"]}
      key={"header1"}
      secondaryAction={
        <IconButton edge="end" aria-label="comments"></IconButton>
      }
      disablePadding
    >
      <ListItemIcon sx={{ columnWidth }}></ListItemIcon>
      <ListItemText
        sx={{ textAlign: "center", columnWidth }}
        id={"header1"}
        primary={"Task"}
      />

      <ListItemText
        sx={{ textAlign: "center", columnWidth }}
        id={"header1"}
        primary={"Due"}
      />
      <ListItemText
        sx={{ textAlign: "center", columnWidth }}
        id={"header1"}
        primary={"Priority"}
      />
    </ListItem>
  );
}

export default ListHead;
