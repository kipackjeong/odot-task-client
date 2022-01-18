import React, { useState } from "react";
import boardStyle from "../src/Board.module.css";
import appStyle from "../src/App.module.css";
import ToDoList from "./components/ToDoList/ToDoList";
import ToDoForm from "./components/ToDoForm/ToDoForm";
import AppCtx from "./context/app-context";
import AppContextInterface from "./context/app-context.interface";
import AppContextProvider from "./context/app-context.provider";

function Board(props: any) {
  return (
    <div className={boardStyle.board}>
      <h1>Board</h1>
      {props.children};
    </div>
  );
}

function App() {
  return (
    <AppContextProvider>
      <div className={appStyle.App}>
        <header className="App-header">
          <h1>App</h1>
        </header>
        <body>
          <Board>
            <ToDoList></ToDoList>
            <ToDoForm></ToDoForm>
          </Board>
        </body>
      </div>
    </AppContextProvider>
  );
}

export default App;
