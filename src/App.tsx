import React, { useState } from "react";
import appStyle from "./App.module.css";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import AppCtx from "./context/app-context";
import AppContextInterface from "./context/app-context.interface";
import AppContextProvider from "./context/app-context.provider";
import Board from "./components/UI/Board";
import StaticDatePickerLandscape from "./components/Calendar/Calendar";
import { Grid } from "@mui/material";

function App() {
  return (
    <AppContextProvider>
      <div className={appStyle.App}>
        <Board>
          <Grid container paddingY={2} spacing={1}>
            <Grid
              item
              xs={6}
              md={6}
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
                <Grid item xs={6} md={6}>
                  <StaticDatePickerLandscape />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TodoForm></TodoForm>
                </Grid>
              </Grid>
            </Grid>
            <Grid item height={"100%"} xs={6} md={6}>
              <TodoList></TodoList>
            </Grid>
          </Grid>
        </Board>
      </div>
    </AppContextProvider>
  );
}

export default App;
