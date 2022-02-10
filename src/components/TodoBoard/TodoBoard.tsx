import { Grid } from "@mui/material";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";
import Board from "components/UI/Board/Board";
import { useCallback, useContext, useState } from "react";
import MainDate from "./MainDate/MainDate";
import useTodoList from "hooks/todo-list/todo-list.hook";
import AppCtx from "context/app-context";
import ReadTodo from "models/read-todo";

const TodoBoard = () => {

  // #region ANCHOR Context
  const ctx = useContext(AppCtx);
  const inCompTodos: ReadTodo[] = ctx.state.inCompTodos;
  const compTodos: ReadTodo[] = ctx.state.compTodos;
  // #endregion Context



  // #region ANCHOR Hooks 
  const {
    listDate,
    listType,
    isItemAdded,
    isLoading,
    allChecked,
    checkedItemIds,

    handleDone,
    handleRemove,
    handleAllCheckToggle,
    handleCheckToggle,
    handleListTypeToggle,
    handleUpdate,
    handleTodoFormSubmit,
    handleCalendarDatePick,
  } = useTodoList(
  );

  // ANCHOR handler

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
              <TodoForm listDate={listDate} onSubmit={handleTodoFormSubmit}></TodoForm>
            </Grid>
          </Grid>
        </Grid>

        <Grid height="100%" item xs md>
          <TodoList
            inCompTodos={inCompTodos}
            compTodos={compTodos}
            listType={listType}
            isLoading={isLoading}
            checkedItemIds={checkedItemIds}
            allChecked={allChecked}
            handleDone={handleDone}
            handleRemove={handleRemove}
            handleAllCheckToggle={handleAllCheckToggle}
            handleCheckToggle={handleCheckToggle}
            handleListTypeToggle={handleListTypeToggle}
            handleUpdate={handleUpdate}
            listDate={listDate}
            isItemAdded={isItemAdded}
          ></TodoList>
        </Grid>
      </Grid>
    </Board>
  );
};

export default TodoBoard;
