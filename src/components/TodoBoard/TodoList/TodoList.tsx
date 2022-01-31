import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { fetchAllAction } from "../../../context/actions/itemActions";
import AppCtx from "context/app-context";
import ReadTodo from "models/read-todo";
import TodoItem from "./TodoListTableBody/TodoItem";
import TodoListTableHead from "./TodoListTableHead/TodoListTableHead";
import todoApi from "../../../api/todoApi";
import todoListStyle from "./TodoList.module.css";
import TodoStatusBtn from "./TodoStatusBtn/TodoStatusBtn";
import TodoListType from "enums/todo-list-type.enum";
import ListChangeToggle from "./ListChangeToggle/ListChangeToggle";
import { ITodo } from "interfaces/interfaces";
import useTodoList from "context/hooks/todo-list.hook";
import TodoListTableBody from "./TodoListTableBody/TodoListTableBody";

type TodoListProperty = {
  listDate: Date;
  isItemAdded: boolean;
  afterFetching: Function;
};

export default function TodoList(props: TodoListProperty) {
  // #region ANCHOR Props
  const { listDate, isItemAdded, afterFetching } = props;
  // #endregion

  // #region ANCHOR Context
  const ctx = useContext(AppCtx);
  const inCompTodos: ReadTodo[] = ctx.state.todos;
  const compTodos: ReadTodo[] = ctx.state.compTodos;
  const dispatch = ctx.dispatch;
  // #endregion Context

  // #region ANCHOR Hooks
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
    handleUpdate,
  } = useTodoList(
    inCompTodos,
    compTodos,
    isItemAdded,
    listDate,
    afterFetching,
    dispatch
  );
  // #endregion Hooks

  // #region ANCHOR State
  const [renderAll, setRenderAll] = useState(true);
  useEffect(() => {
    setRenderAll(true);
  }, [listType]);
  useEffect(() => {
    if (isItemAdded) {
      setRenderAll(false);
    }
  }, [isItemAdded]);
  // #endregion State

  // #region ANCHOR Styles
  const checkBoxColor = "success";
  const itemFontSize = "1rem";
  const headerFontSize = "  1.0rem";
  // #endregion Styles
  return isLoading ? (
    <div>loading</div>
  ) : (
    <div style={{ paddingLeft: "1%", width: "97%", height: "95%" }}>
      <div style={{ position: "static" }}>
        <TodoStatusBtn
          listType={listType}
          showButtons={checkedItemIds.length > 0}
          onDone={handleDone}
          onRemove={handleRemove}
        />
      </div>
      <ListChangeToggle listType={listType} onChange={handleListTypeToggle} />

      <TableContainer style={{ width: "100%" }} className={todoListStyle.list}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TodoListTableHead
            fontSize={headerFontSize}
            checkBoxColor={checkBoxColor}
            onCheckToggle={handleAllCheckToggle}
            checked={allChecked}
          />
          <TodoListTableBody
            todos={
              listType === TodoListType.Completed ? compTodos : inCompTodos
            }
            renderAll={renderAll}
            fontSize={itemFontSize}
            checkBoxColor={checkBoxColor}
            onCheckToggle={handleCheckToggle}
            checkedItemIds={checkedItemIds}
            onUpdate={handleUpdate}
          />
        </Table>
      </TableContainer>
    </div>
  );
}
