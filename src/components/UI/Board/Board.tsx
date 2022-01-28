import Paper from "@mui/material/Paper";
import React from "react";
import boardStyle from "./Board.module.css";

function Board(props: any) {
  return (
    <Paper className={boardStyle.board} elevation={2}>
      {props.children}
    </Paper>
  );
}

export default Board;
