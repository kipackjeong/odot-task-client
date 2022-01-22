import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { fetchAllAction } from "../../../actions/itemActions";
import AppCtx from "../../../context/app-context";
import ReadTodo from "../../../models/read-todo";
import TodoItem from "./TodoItem/TodoItem";
import ListHead from "./ListHead/ListHead";
import todoApi from "../../../api/todoApi";
import todoListStyle from "./TodoList.module.css";
import TodoStatusBtn from "./TodoStatusBtn/TodoStatusBtn";
import { TodoListType } from "../TodoBoard";
import ListChangeToggle from "./ListChangeToggle/ListChangeToggle";
import { ITodo } from "../../../interfaces/interfaces";
import useTodoList from "../../../hooks/use-todo-list";

type TodoListProperty = {
  date: Date;
  itemAdded: boolean;
  resetItemAddedStatus: Function;
};

export default function TodoList(props: TodoListProperty) {
  // ANCHOR props
  const { date, itemAdded, resetItemAddedStatus } = props;

  // ANCHOR context
  const ctx = useContext(AppCtx);
  const inCompTodos: ReadTodo[] = ctx.state.todos;
  const compTodos: ReadTodo[] = ctx.state.compTodos;
  const dispatch = ctx.dispatch;

  // ANCHOR hooks
  const {
    listType,
    isLoading,
    checkedItemIds,
    allChecked,
    handleDone,
    handleRemove,
    handleAllCheckToggle,
    handleCheckToggle,
    handleListTypeToggle,
  } = useTodoList(
    inCompTodos,
    compTodos,
    itemAdded,
    date,
    resetItemAddedStatus,
    dispatch
  );

  // ANCHOR styles
  const checkBoxColor = "success";

  const todos = listType === TodoListType.Incompleted ? inCompTodos : compTodos;
  console.log(todos);

  return isLoading ? (
    <div>loading</div>
  ) : (
    <div style={{ width: "100%" }}>
      <div style={{ position: "static" }}>
        <TodoStatusBtn
          showButtons={checkedItemIds.length > 0}
          onDone={handleDone}
          onRemove={handleRemove}
        />
      </div>

      <ListChangeToggle listType={listType} onToggle={handleListTypeToggle} />

      <TableContainer className={todoListStyle.list}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <ListHead
              checkBoxColor={checkBoxColor}
              onCheckToggle={handleAllCheckToggle}
              checked={allChecked}
            />
          </TableHead>
          {listType === TodoListType.Incompleted ? (
            <TableBody>
              {inCompTodos.map((todo: ReadTodo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  checkBoxColor={checkBoxColor}
                  onCheckToggle={handleCheckToggle}
                  checked={checkedItemIds.indexOf(todo.id) !== -1}
                />
              ))}
            </TableBody>
          ) : (
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
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
