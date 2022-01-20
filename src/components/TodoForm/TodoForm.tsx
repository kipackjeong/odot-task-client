import {
  Button,
  FormControl,
  Grid,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { SyntheticEvent, useContext, useState } from "react";
import todoFormStyle from "./TodoFormStyle.module.css";
import axios from "axios";
import AppCtx from "../../context/app-context";
import { addItemAction } from "../../actions/itemActions";
import { ITodo } from "../../interfaces/interfaces";
import DateSelector from "../Calendar/DateSelector";
import { isEmpty } from "../../utilities/validation.utility";

function TodoInput(props: any) {
  return (
    <>
      <TextField
        color="success"
        label="What To Do?"
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        error={props.error}
      />
    </>
  );
}

function TodoForm() {
  const { dispatch } = useContext(AppCtx);

  const [task, setTask] = useState("");
  const [typed, setTyped] = useState(false);

  const onChangeHandler = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setTask(target.value);
    setTyped(true);
  };
  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!isEmpty(task)) {
      setTyped(true);
      return;
    }

    let creatingTodo: ITodo = {
      task: task,
    };

    const response = await axios.post(
      "http://localhost:3000/items",
      creatingTodo
    );
    const createdTodoFromServer = response.data.data;

    dispatch(addItemAction(createdTodoFromServer));
    setTask("");
    setTyped(false);
  };

  const inputError: boolean = task.trim() === "" && typed ? true : false;

  return (
    <Grid
      container
      height={"100%"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FormControl
        className={todoFormStyle["form-control"]}
        fullWidth
        margin={"dense"}
        component="fieldset"
      >
        <form onSubmit={onSubmitHandler}>
          <Grid md>
            <TodoInput
              fullWidth
              value={task}
              onChange={onChangeHandler}
              error={inputError}
            ></TodoInput>
          </Grid>
          <Grid md>
            <DateSelector />
          </Grid>
          <Grid md>
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </Grid>
        </form>
      </FormControl>
    </Grid>
  );
}
export default TodoForm;
