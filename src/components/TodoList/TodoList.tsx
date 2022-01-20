import React, { useContext, useEffect, useMemo, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";
import todoListStyle from "./TodoList.module.css";
import { List } from "@mui/material";
import AppCtx from "../../context/app-context";
import ListHead from "./ListHead/ListHead";
import { ITodo } from "../../interfaces/interfaces";
import { removeItemsAction } from "../../actions/itemActions";

function TodoList(props: any) {
  const ctx = useContext(AppCtx);
  const { todos } = ctx.state;

  const defaultChecked: number[] = useMemo(() => {
    return [];
  }, []);
  const [checked, setChecked] = React.useState(defaultChecked);
  const [isLoading, setIsLoading] = useState(todos.length === 0);

  useEffect(() => {
    if (todos.length !== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [todos]);

  const handleCheckToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDone = () => {
    ctx.dispatch(removeItemsAction(checked));
    setChecked(defaultChecked);
  };
  const handleRemove = () => {
    ctx.dispatch(removeItemsAction(checked));
    setChecked(defaultChecked);
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
      <ListHead showDoneButton={checked.length !== 0} onRemove={handleDone} />
      {todos.map((todo: ITodo, idx: number) => {
        return (
          <TodoItem
            todo={todo}
            idx={idx}
            checkToggle={handleCheckToggle}
            checked={checked.indexOf(idx) !== -1}
          />
        );
      })}
    </List>
  );
}

export default TodoList;
