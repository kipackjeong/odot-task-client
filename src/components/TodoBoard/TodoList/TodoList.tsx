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
  listDate: Date;
  isItemAdded: boolean;
  afterFetching: Function;
};

export default function TodoList(props: TodoListProperty) {
  // ANCHOR props
  const { listDate, isItemAdded, afterFetching } = props;

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
    handleUpdate,
  } = useTodoList(
    inCompTodos,
    compTodos,
    isItemAdded,
    listDate,
    afterFetching,
    dispatch
  );

  // ANCHOR state
  const [renderAll, setRenderAll] = useState(true);
  useEffect(() => {
    setRenderAll(true);
  }, [listType]);
  useEffect(() => {
    if (isItemAdded) {
      setRenderAll(false);
    }
  }, [isItemAdded]);

  // ANCHOR styles
  const checkBoxColor = "success";
  const itemFontSize = "1rem";
  const headerFontSize = "1.0rem";

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

      <TableContainer className={todoListStyle.list}>
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
