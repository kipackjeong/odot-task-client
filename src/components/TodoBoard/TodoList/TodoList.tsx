import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { fetchAllAction } from "../../../actions/itemActions";
import AppCtx from "../../../context/app-context";
import ReadTodo from "../../../models/read-todo";
import TodoItem from "./TodoListTableBody/TodoItem";
import TodoListTableHead from "./TodoListTableHead/TodoListTableHead";
import todoApi from "../../../api/todoApi";
import todoListStyle from "./TodoList.module.css";
import TodoStatusBtn from "./TodoStatusBtn/TodoStatusBtn";
import { TodoListType } from "../TodoBoard";
import ListChangeToggle from "./ListChangeToggle/ListChangeToggle";
import { ITodo } from "../../../interfaces/interfaces";
import useTodoList from "../../../hooks/use-todo-list";
import TodoListTableBody from "./TodoListTableBody/TodoListTableBody";

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
          <TodoListTableHead
            checkBoxColor={checkBoxColor}
            onCheckToggle={handleAllCheckToggle}
            checked={allChecked}
          />
          <TodoListTableBody
            todos={
              listType === TodoListType.Completed ? compTodos : inCompTodos
            }
            checkBoxColor={checkBoxColor}
            handleCheckToggle={handleCheckToggle}
            checkedItemIds={checkedItemIds}
          />
        </Table>
      </TableContainer>
    </div>
  );
}
