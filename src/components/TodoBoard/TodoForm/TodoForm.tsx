import { Button, FormControl, Grid, TextField } from "@mui/material";
import React, { SyntheticEvent, useContext, useState } from "react";
import todoFormStyle from "./TodoFormStyle.module.css";
import AppCtx from "../../../context/app-context";
import { addItemAction } from "../../../actions/itemActions";
import DateSelector from "../Calendar/DateSelector";
import { isEmpty } from "../../../utilities/validation.utility";
import todoApi from "../../../api/todoApi";
import CreateTodo from "../../../models/create-todo";
import ReadTodo from "../../../models/read-todo";

function TodoInput(props: any) {
  return (
    <>
      <TextField
        fullWidth
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

type TodoFormProp = {
  onSubmit: Function;
};

function TodoForm(props: TodoFormProp) {
  // context
  const { dispatch } = useContext(AppCtx);
  // state
  const [task, setTask] = useState("");
  const [typed, setTyped] = useState(false);

  // props
  const { onSubmit } = props;

  // handlers
  const handleOnChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setTask(target.value);
    setTyped(true);
  };
  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!isEmpty(task)) {
      setTyped(true);
      return;
    }

    let creatingTodo: CreateTodo = {
      task: task,
    };

    const createdTodoFromServer: ReadTodo = await todoApi.createTodo(
      creatingTodo
    );

    dispatch(addItemAction(createdTodoFromServer));
    setTask("");
    setTyped(false);
    onSubmit(true);
  };

  // error check
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
        <form onSubmit={handleOnSubmit}>
          <Grid style={{ width: "100%" }} item md>
            <TodoInput
              fullWidth
              value={task}
              onChange={handleOnChange}
              error={inputError}
            ></TodoInput>
          </Grid>
          <Grid item md>
            <DateSelector />
          </Grid>
          <Grid item md>
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
