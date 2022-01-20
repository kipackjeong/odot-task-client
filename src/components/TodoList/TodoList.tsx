import React, { useContext, useEffect, useMemo, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";
import todoListStyle from "./TodoList.module.css";
import { List, ScopedCssBaseline } from "@mui/material";
import AppCtx from "../../context/app-context";
import ListHead from "./ListHead/ListHead";
import { fetchAllAction, removeItemsAction } from "../../actions/itemActions";
import todoApi from "../../api/todoApi";
import ReadTodo from "../../models/read-todo";

function TodoList(props: any) {
  // Context
  const { state, dispatch } = useContext(AppCtx);
  const { todos } = state;

  // States
  const defaultChecked: string[] = useMemo(() => {
    return [];
  }, []);
  const [checked, setChecked] = React.useState(defaultChecked);
  const [isLoading, setIsLoading] = useState(false);

  //
  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);
      const newTodos = await todoApi.getAllTodos();
      dispatch(fetchAllAction(newTodos));
      setIsLoading(false);
    }

    if (checked.length === 0) {
      fetchData();
    }
  }, [checked, dispatch]);

  // Handlers
  const handleCheckToggle = (todoId: string) => () => {
    const currentIndex = checked.indexOf(todoId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(todoId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDone = () => {};

  const handleRemove = async () => {
    dispatch(removeItemsAction(checked));
    if (checked.length > 1) {
      await todoApi.deleteMultipleTodos(checked);
    } else if (checked.length === 1) {
      await todoApi.deleteTodo(checked[0]);
    } else {
      return;
    }
    setChecked([]);
  };

  // Subs
  const Loading = () => {
    return <div>isLoading..</div>;
  };

  return isLoading ? (
    <Loading />
  ) : (
    <List sx={{ bgcolor: "background.paper" }} className={todoListStyle.list}>
      {
        //TODO: implement onDone
      }
      <ListHead
        showDoneButton={checked.length !== 0}
        onRemove={handleRemove}
        onDone={handleDone}
      />
      {todos.map((todo: ReadTodo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkToggle={handleCheckToggle}
            checked={checked.indexOf(todo.id) !== -1}
          />
        );
      })}
    </List>
  );
}

export default TodoList;
