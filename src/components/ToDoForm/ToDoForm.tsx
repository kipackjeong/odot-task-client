import { Button, FormControl, TextField } from "@mui/material";
import React, { SyntheticEvent, useContext, useState } from "react";
import todoFormStyle from "./ToDoFormStyle.module.css";
import axios from "axios";
import AppCtx from "../../context/app-context";
import { addItemAction } from "../../actions/itemActions";
import { ITodo } from "../../interfaces/interfaces";

function ToDoInput(props: any) {
  return (
    <>
      <TextField
        id="standard-basic"
        label="What To Do?"
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        error={props.error}
      />
    </>
  );
}

function ToDoForm() {
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
    <div className={todoFormStyle.form}>
      <FormControl fullWidth margin={"dense"} component="fieldset">
        <form onSubmit={onSubmitHandler}>
          <ToDoInput
            fullWidth
            value={title}
            onChange={onChangeHandler}
            error={inputError}
          ></ToDoInput>
          <Button type="submit">button</Button>
        </form>
      </FormControl>
    </div>
  );
}
export default ToDoForm;
