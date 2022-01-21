import { ButtonGroup, IconButton } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import todoStatusBtnStyle from "./TodoStatusBtn.module.css";
import ReactDOM from "react-dom";

const TodoStatusBtn = (props: any) => {
  // props
  const { showButtons, onDone, onRemove } = props;

  // handler

  return (
    <div style={{ position: "absolute", right: "59.2%" }}>
      {showButtons ? (
        <ButtonGroup className={todoStatusBtnStyle[".button-group"]}>
          <IconButton color="success" size="small" onClick={onDone}>
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton color="secondary" size="small" onClick={onRemove}>
            <DeleteOutlineIcon />
          </IconButton>
        </ButtonGroup>
      ) : null}
    </div>
  );
};

export default TodoStatusBtn;
