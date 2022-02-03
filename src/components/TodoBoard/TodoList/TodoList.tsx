import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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
  inCompTodos: ReadTodo[],
  compTodos: ReadTodo[],
  listType: TodoListType;
  listDate: Date;
  checkedItemIds: string[];
  isLoading: boolean;
  isItemAdded: boolean;
  allChecked: boolean;
  handleDone: any;
  handleRemove: any;
  handleAllCheckToggle: any;
  handleCheckToggle: any;
  handleListTypeToggle: any;
  handleUpdate: any;
  afterFetching?: Function;
};

export default function TodoList(props: TodoListProperty) {

  // #region ANCHOR State
  const [renderAll, setRenderAll] = useState(true);

  useEffect(() => {
    setRenderAll(true);
  }, [props.listType]);
  useEffect(() => {
    if (props.isItemAdded) {
      setRenderAll(false);
    }
  }, [props.isItemAdded]);
  // #endregion State

  // #region ANCHOR Styles
  const checkBoxColor = "success";
  const itemFontSize = "1rem";
  const headerFontSize = "  1.0rem";
  // #endregion Styles
  return props.isLoading ? (
    <div>loading</div>
  ) : (
    <div style={{ paddingLeft: "1%", width: "97%", height: "95%" }}>
      <div style={{ position: "static" }}>
        <TodoStatusBtn
          listType={props.listType}
          showButtons={props.checkedItemIds.length > 0}
          onDone={props.handleDone}
          onRemove={props.handleRemove}
        />
      </div>
      <ListChangeToggle listType={props.listType} onChange={props.handleListTypeToggle} />

      <TableContainer style={{ width: "100%" }} className={todoListStyle.list}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TodoListTableHead
            fontSize={headerFontSize}
            checkBoxColor={checkBoxColor}
            onCheckToggle={props.handleAllCheckToggle}
            checked={props.allChecked}
          />
          {props.listType === TodoListType.Completed ? <TodoListTableBody
            todos={props.compTodos}
            listType={props.listType}
            renderAll={renderAll}
            fontSize={itemFontSize}
            checkBoxColor={checkBoxColor}
            onCheckToggle={props.handleCheckToggle}
            checkedItemIds={props.checkedItemIds}
            onUpdate={props.handleUpdate}
          /> : <TodoListTableBody
            todos={props.inCompTodos}
            listType={props.listType}
            renderAll={renderAll}
            fontSize={itemFontSize}
            checkBoxColor={checkBoxColor}
            onCheckToggle={props.handleCheckToggle}
            checkedItemIds={props.checkedItemIds}
            onUpdate={props.handleUpdate}
          />}

        </Table>
      </TableContainer>
    </div>
  );
}
