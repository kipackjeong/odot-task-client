import { Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import Calendar from "./Calendar/Calendar";
import TodoForm from "./TodoForm/TodoForm";
import TodoListTwo from "./TodoList/TodoListTwo";
import Board from "../UI/Board";
import { useState } from "react";
import todoListStyle from "./TodoList/TodoList.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ListChangeToggle from "./ListChangeToggle/ListChangeToggle";
import TodoStatusBtn from "./TodoList/TodoStatusBtn/TodoStatusBtn";

export enum TodoListType {
  ALL = 0,
  Completed = 1,
  Incompleted = 2,
}

const TodoBoard = () => {
  const [listType, setListType] = useState(TodoListType.Incompleted);
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const handleCalendarDatePick = (newDate: any) => {
    setDate(newDate);
  };
  const handleToggle = () => {
    if (listType === TodoListType.Incompleted)
      setListType(TodoListType.Completed);
    else setListType(TodoListType.Incompleted);
  };

  return (
    <Board>
      <Grid container paddingY={2} spacing={1}>
        <Grid
          item
          xs={4}
          md={4}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Grid
            columns={12}
            container
            height={"100%"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <Grid item xs={12} md={12}>
              <Calendar date={date} onChange={handleCalendarDatePick} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TodoForm></TodoForm>
            </Grid>
          </Grid>
        </Grid>

        <Grid height="100%" item xs md>
          <TodoListTwo
            date={date}
            listType={listType}
            onToggle={handleToggle}
          ></TodoListTwo>
        </Grid>
      </Grid>
    </Board>
  );
};

export default TodoBoard;
