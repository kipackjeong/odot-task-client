import { Button, FormControl, TextField } from "@mui/material";
import React, { SyntheticEvent, useContext, useState } from "react";
import todoFormStyle from "./ToDoFormStyle.module.css";
import axios from "axios";
import AppCtx from "../../context/app-context";

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
  const [toDo, setToDo] = useState("");
  const [typed, setTyped] = useState(false);
  const { dispatch } = useContext(AppCtx);

  const onChangeHandler = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setToDo(target.value);
    setTyped(true);
  };
  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3000/items", {
      title: toDo,
    });
    console.log(response);
    console.log(toDo);
    setToDo("");
    setTyped(false);
  };

  const inputError: boolean = toDo.trim() === "" && typed ? true : false;

  return (
    <div className={todoFormStyle.form}>
      <FormControl fullWidth margin={"dense"} component="fieldset">
        <form onSubmit={onSubmitHandler}>
          <ToDoInput
            fullWidth
            value={toDo}
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
