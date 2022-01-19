import React, { useContext, useEffect, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";
import todoListStyle from "./TodoList.module.css";
import { Backdrop, List, Paper } from "@mui/material";
import AppCtx from "../../context/app-context";
import ListHead from "./ListHead/ListHead";

function TodoList(props: any) {
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
    <List
      sx={{
        width: "100%",
        height: "92%",
        overflowY: "scroll",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <ListHead />
      {todos.map((todo: any) => {
        return (
          <TodoItem
            todo={todo}
            checkToggle={handleCheckToggle}
            checked={checked.indexOf(todo) !== -1}
          />
        );
      })}
    </List>
  );
}

export default TodoList;
