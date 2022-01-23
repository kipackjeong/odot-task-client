import { ButtonGroup, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./TodoStatusBtn.css";

import { TodoListType } from "../../TodoBoard";

type TodoStatusBtn = {
  listType: TodoListType;
  showButtons: boolean;
  onDone: boolean;
  onRemove: Function;
};
const TodoStatusBtn = (props: any) => {
  // ANCHOR props
  const { listType, showButtons, onDone, onRemove } = props;

  // ANCHOR state
  // ANCHOR style
  const buttonAnimationStyle = {
    display: "block",
  };
  const firstBtnColor =
    listType === TodoListType.Incompleted ? "success" : "disabled";

  const animationClassName = showButtons ? null : "inactive";

  return (
    <div style={{ position: "absolute", right: "59.2%" }}>
      <CSSTransition in={showButtons} classNames="fade" timeout={2000}>
        <ButtonGroup className="buttons">
          <IconButton size="small" onClick={onDone}>
            <CheckCircleOutlineIcon color={firstBtnColor} />
          </IconButton>
          <IconButton color="secondary" size="small" onClick={onRemove}>
            <DeleteOutlineIcon />
          </IconButton>
        </ButtonGroup>
      </CSSTransition>
    </div>
  );
};

export default TodoStatusBtn;
