import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchAllAction } from "../../../actions/itemActions";
import AppCtx from "../../../context/app-context";
import ReadTodo from "../../../models/read-todo";
import TodoItem from "./TodoItem/TodoItem";
import ListHead from "./ListHead/ListHead";
import todoApi from "../../../api/todoApi";
import todoListStyle from "./TodoList.module.css";
import TodoStatusBtn from "./TodoStatusBtn/TodoStatusBtn";
import { TodoListType } from "../TodoBoard";
import ListChangeToggle from "../ListChangeToggle/ListChangeToggle";

export default function TodoListTwo(props: any) {
  // context
  const ctx = useContext(AppCtx);
  const todos: ReadTodo[] = ctx.state.todos;
  const dispatch = ctx.dispatch;

  // props
  const { listType, onToggle, date } = props;
  // local state
  const defaultChecked: string[] = [];
  const [checkedItemIds, setCheckedItemIds] = useState(defaultChecked);
  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // helper
  async function fetchData(): Promise<void> {
    let newTodos;
    switch (listType) {
      case TodoListType.Completed:
        newTodos = await todoApi.getCompletedTodos(date);
        break;
      case TodoListType.Incompleted:
        newTodos = await todoApi.getInCompletedTodos(date);
        break;
    }
    console.log(newTodos);
    dispatch(fetchAllAction(newTodos));
    setIsLoading(false);
  }

  // useEffects
  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  useEffect(() => {
    fetchData();
  }, [listType, date]);

  const handleAllCheckToggle = () => {
    // remove all check
    if (checkedItemIds.length > 0) {
      setCheckedItemIds([]);
      setAllChecked(false);
    } else {
      // check all
      setCheckedItemIds((checkedIds) => {
        const newCheckedIds: string[] = [];
        for (var todo of todos) {
          newCheckedIds.push(todo.id);
        }

        return newCheckedIds;
      });
      setAllChecked((prev) => !prev);
    }
  };

  // handlers
  const handleCheckToggle = (todoId: string) => {
    // when removing check
    if (checkedItemIds.includes(todoId)) {
      setCheckedItemIds((prev) => {
        let newState = [...prev];
        newState = newState.filter((itemId: string) => {
          return itemId !== todoId;
        });
        return newState;
      });
    }
    // when checking
    else {
      setCheckedItemIds((prev) => [...prev, todoId]);
    }
  };

  const handleRemove = async () => {
    // DELETE request
    await todoApi.deleteMultipleTodos(checkedItemIds);

    // empty out checkedItemIds.
    setCheckedItemIds([]);
    // loading
    setIsLoading(true);
    // refresh allChecked.
    setAllChecked(false);
  };

  const handleDone = async () => {
    // need to update all todos checked
    await todoApi.updateMultipleTodos(checkedItemIds);
    // empty out checkedItemIds.
    setCheckedItemIds([]);
    // loading
    setIsLoading(true);
    // refresh allChecked.
    setAllChecked(false);
  };

  // styles
  const checkBoxColor = "success";

  return (
    <div style={{ width: "100%" }}>
      <div style={{ position: "static" }}>
        <TodoStatusBtn
          showButtons={checkedItemIds.length > 0}
          onDone={handleDone}
          onRemove={handleRemove}
        />
      </div>

      <ListChangeToggle onToggle={onToggle} />

      <TableContainer className={todoListStyle.list}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <ListHead
              checkBoxColor={checkBoxColor}
              onCheckToggle={handleAllCheckToggle}
              checked={allChecked}
            />
          </TableHead>
          <TableBody>
            {todos.map((todo: ReadTodo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                checkBoxColor={checkBoxColor}
                onCheckToggle={handleCheckToggle}
                checked={checkedItemIds.indexOf(todo.id) !== -1}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
