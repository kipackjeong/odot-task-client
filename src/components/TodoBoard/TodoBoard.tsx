import { Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import Calendar from "./Calendar/Calendar";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";
import Board from "../UI/Board";
import { useCallback, useState } from "react";
import todoListStyle from "./TodoList/TodoList.module.css";

export enum TodoListType {
  ALL = 0,
  Completed = 1,
  Incompleted = 2,
}

const TodoBoard = () => {
  // ANCHOR states
  const [listDate, setDate] = useState<Date>(new Date(Date.now()));

  const [isItemAdded, setIsItemAdded] = useState<boolean>(false);

  // ANCHOR handler

  const handleCalendarDatePick = (newDate: any) => {
    setDate(newDate);
  };

  const handleSubmit = () => {
    setIsItemAdded(true);
  };

  const resetIsItemAddedAfteFetching = useCallback(() => {
    setIsItemAdded(false);
  }, []);

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
              <Calendar date={listDate} onChange={handleCalendarDatePick} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TodoForm onSubmit={handleSubmit}></TodoForm>
            </Grid>
          </Grid>
        </Grid>

        <Grid height="100%" item xs md>
          <TodoList
            date={listDate}
            isItemAdded={isItemAdded}
            afterFetching={resetIsItemAddedAfteFetching}
          ></TodoList>
        </Grid>
      </Grid>
    </Board>
  );
};

export default TodoBoard;
