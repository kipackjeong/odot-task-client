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
  const [title, setTitle] = useState("");
  const [typed, setTyped] = useState(false);
  const { dispatch } = useContext(AppCtx);

  const onChangeHandler = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
    setTyped(true);
  };
  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    let creatingTodo: ITodo = {
      title: title,
    };
    const response = await axios.post(
      "http://localhost:3000/items",
      creatingTodo
    );

    const createdTodoFromServer = response.data.data;
    console.log(response.data);
    console.log(createdTodoFromServer);
    dispatch(addItemAction(createdTodoFromServer));
    setTitle("");
    setTyped(false);
  };

  const inputError: boolean = title.trim() === "" && typed ? true : false;

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
              value={title}
              onChange={onChangeHandler}
              error={inputError}
            ></TodoInput>
          </Grid>
          <Grid md>
            <DateSelector />
          </Grid>
          <Grid md>
            <Button variant="outlined" type="submit">
              {" "}
              Save{" "}
            </Button>
          </Grid>
        </form>
      </FormControl>
    </Grid>
  );
}
export default TodoForm;
