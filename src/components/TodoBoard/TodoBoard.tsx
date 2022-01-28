import { Grid } from "@mui/material";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";
import Board from "components/UI/Board/Board";
import { useCallback, useState } from "react";
import todoListStyle from "./TodoList/TodoList.module.css";
import MainDate from "./MainDate/MainDate";

const TodoBoard = () => {
  // ANCHOR states
  const [listDate, setListDate] = useState<Date>(new Date(Date.now()));
  console.log("listDate: " + listDate);

  const [isItemAdded, setIsItemAdded] = useState<boolean>(false);

  // ANCHOR handler

  const handleCalendarDatePick = (newDate: any) => {
    setListDate(newDate);
  };

  const handleSubmit = () => {
    setIsItemAdded(true);
  };

  const resetIsItemAddedAfteFetching = useCallback(() => {
    setIsItemAdded(false);
  }, []);

  return (
    <Board>
      <Grid container paddingY={1} paddingX={1} spacing={1}>
        <Grid
          item
          xs={3}
          md={3}
          height="100vh%"
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Grid
            container
            height={"450px"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <Grid item xs={3} md={1} width={"100%"}>
              <MainDate
                listDate={listDate}
                onDateChange={handleCalendarDatePick}
              />
            </Grid>

            <Grid item xs={9} md={11}>
              <TodoForm listDate={listDate} onSubmit={handleSubmit}></TodoForm>
            </Grid>
          </Grid>
        </Grid>

        <Grid height="100%" item xs md>
          <TodoList
            listDate={listDate}
            isItemAdded={isItemAdded}
            afterFetching={resetIsItemAddedAfteFetching}
          ></TodoList>
        </Grid>
      </Grid>
    </Board>
  );
};

export default TodoBoard;
