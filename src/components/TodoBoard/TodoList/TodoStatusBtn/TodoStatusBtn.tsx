import { ButtonGroup, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./TodoStatusBtn.css";

import TodoListType from "enums/todo-list-type.enum";

type TodoStatusBtnProps = {
  listType: TodoListType;
  showButtons: boolean;
  onDone: any;
  onRemove: any;
};

const TodoStatusBtn = (props: TodoStatusBtnProps) => {
  // #region  ANCHOR props
  const { listType, showButtons, onDone, onRemove } = props;
  // #endregion 

  // #region ANCHOR Style
  const buttonAnimationStyle = {
    display: "block",
  };
  const firstBtnColor =
    listType === TodoListType.Incompleted ? "success" : "disabled";

  const animationClassName = showButtons ? null : "inactive";
  // #endregion 
  return (
    <div
      className={`status-container ${showButtons ? "show" : null}`}
    >

      <ButtonGroup className="buttons">
        <IconButton size="small" onClick={onDone}>
          <CheckCircleOutlineIcon color={firstBtnColor} />
        </IconButton>
        <IconButton color="secondary" size="small" onClick={onRemove}>
          <DeleteOutlineIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default TodoStatusBtn;
