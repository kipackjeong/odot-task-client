import React, { useState } from "react";
import appStyle from "./App.module.css";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import AppContextProvider from "./context/app-context.provider";
import Board from "./components/UI/Board";
import Calendar from "./components/Calendar/Calendar";
import { Divider, Grid } from "@mui/material";
import TodoListTwo from "./components/TodoList/TodoListTwo";

function App() {
  return (
    <AppContextProvider>
      <div className={appStyle.App}>
        <Board>
          <Grid container paddingY={2} spacing={1}>
            <Grid
              item
              xs={4}
              md={4}
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
                  <Calendar />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TodoForm></TodoForm>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs md>
              {/* <TodoList></TodoList> */}
              <TodoListTwo></TodoListTwo>
            </Grid>
          </Grid>
        </Board>

        {
          //TODO: Make references component
        }
        <a href="https://www.flaticon.com/free-icons/tick" title="tick icons">
          Tick icons created by Alfredo Hernandez - Flaticon
        </a>
      </div>
    </AppContextProvider>
  );
}

export default App;
