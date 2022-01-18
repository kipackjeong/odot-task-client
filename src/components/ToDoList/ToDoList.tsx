import React, { useContext, useEffect, useState } from "react";
import ToDoItem from "./ToDoItem/ToDoItem";
import toDoListStyle from "./ToDoList.module.css";
import { List, Paper } from "@mui/material";
import AppCtx from "../../context/app-context";
import ListHead from "./ListHead/ListHead";

function ToDoList(props: any) {
  const ctx = useContext(AppCtx);
  const { todos } = ctx.state;

  const [checked, setChecked] = React.useState([0]);
  const [isLoading, setIsLoading] = useState(todos.length === 0);
  useEffect(() => {
    if (todos.length !== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [todos]);

  const handleCheckToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const Loading = () => {
    return <div>isLoading..</div>;
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Paper className={toDoListStyle.list} elevation={2}>
      <List
        sx={{
          height: "100%",
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <ListHead />
        {todos.map((toDo: any) => {
          return (
            <ToDoItem
              toDo={toDo}
              checkToggle={handleCheckToggle}
              checked={checked.indexOf(toDo) !== -1}
            />
          );
        })}
      </List>
    </Paper>
  );
}

export default ToDoList;
