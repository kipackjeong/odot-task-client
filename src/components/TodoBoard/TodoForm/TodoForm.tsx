import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { SyntheticEvent, useContext, useState, useEffect } from "react";
import todoFormStyle from "./TodoForm.module.css";
import "./TodoForm.css";
import AppCtx from "../../../context/app-context";
import { addItemAction } from "../../../actions/itemActions";
import { isEmpty } from "../../../utilities/validation.utility";
import todoApi from "../../../api/todoApi";
import CreateTodo from "../../../models/create-todo";
import ReadTodo from "../../../models/read-todo";
import { TodoListType } from "../TodoBoard";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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
  listDate: Date;
  onSubmit: Function;
};

function TodoForm(props: TodoFormProp) {
  // ANCHOR context
  const { dispatch } = useContext(AppCtx);

  // ANCHOR props
  const { onSubmit, listDate } = props;

  // ANCHOR state
  const [task, setTask] = useState("");
  const [typed, setTyped] = useState(false);
  const [dueDate, setDueDate] = useState<Date>(listDate);

  // ANCHOR useEffect
  useEffect(() => {
    setDueDate(listDate);
  }, [listDate]);

  // ANCHOR local var
  const todayDate = new Date(Date.now());

  // ANCHOR handlers
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
      dueDate: dueDate,
    };

    const createdTodoFromServer: ReadTodo = await todoApi.createTodo(
      creatingTodo
    );

    dispatch(addItemAction(createdTodoFromServer, TodoListType.Incompleted));
    setTask("");
    setTyped(false);
    onSubmit(true);
  };
  const handleOnDateAccept = (date: Date | null) => {
    console.log("TodoForm - handleOnDateAccept");
    console.log(date);
    if (!date || date < todayDate) {
      return;
    }
    setDueDate(date);
  };
  // error check
  const inputError: boolean = task.trim() === "" && typed ? true : false;

  return (
    <FormControl
      className={todoFormStyle["form-control"]}
      fullWidth
      margin={"dense"}
      component="fieldset"
    >
      <form style={{ height: "100%", width: "100%" }} onSubmit={handleOnSubmit}>
        <Grid
          container
          width={"100%"}
          height={"100%"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item width={"90%"} md={4}>
            <TodoInput
              value={task}
              onChange={handleOnChange}
              error={inputError}
            ></TodoInput>
          </Grid>

          <Grid item md={4}>
            <Grid container justifyContent={"center"}>
              <Grid item md={7}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={dueDate}
                    onChange={() => {}}
                    onAccept={handleOnDateAccept}
                    onError={console.log}
                    minDate={new Date("2018-01-01T00:00")}
                    inputFormat={"MM/dd/yyyy"}
                    mask="__/__/____"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item md={4}>
                <div style={{ position: "relative" }}>
                  <InputLabel
                    style={{ position: "absolute", left: "0%" }}
                    id="demo-simple-select-label"
                  >
                    Age
                  </InputLabel>
                  <Select
                    margin="none"
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    defaultValue={10}
                    label="Age"
                    onChange={() => {}}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText style={{ textAlign: "center" }}>
                    optional
                  </FormHelperText>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormControl>
  );
}
export default TodoForm;
