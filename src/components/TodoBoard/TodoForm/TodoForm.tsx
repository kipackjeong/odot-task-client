import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import "./TodoForm.css";
import AppCtx from "context/app-context";
import { createAddItemAction } from "context/actions/item.action.creator";
import { isEmpty } from "utilities/validation.utility";
import CreateTodo from "models/create-todo";
import ReadTodo from "models/read-todo";
import TodoListType from "enums/todo-list-type.enum";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Priority from "enums/priority.enum";
import PriorityIcon from "../../UI/PriorityIcon/PriorityIcon";
import TaskInput from "components/UI/TaskInput/TaskInput";
import todoService from "service/todo.service";
import useTodoForm, { useTodoFormOutputs } from "hooks/todo-form/todo-form.hook";

type TodoFormProp = {
  listDate: Date;
};

function TodoForm(props: TodoFormProp) {

  /* Hook */
  const useTodoFormOutputs: useTodoFormOutputs = useTodoForm({ listDate: props.listDate });


  return (
    <form style={{ height: "100%", width: "100%" }} onSubmit={useTodoFormOutputs.handleOnSubmit}>
      <Grid
        container
        width={"100%"}
        height={"450px"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item width={"90%"} md={4}>
          <TaskInput
            value={useTodoFormOutputs.task}
            label="What do you need to do?"
            onChange={useTodoFormOutputs.handleOnChange}
            error={useTodoFormOutputs.showInputError}
          />
        </Grid>

        <Grid item md={4}>
          <Grid container justifyContent={"center"}>
            <Grid item md={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Due Date"
                  value={useTodoFormOutputs.dueDate}
                  minDate={new Date("2021-01-01T00:00")}
                  onChange={useTodoFormOutputs.handleOnDateAccept}
                  inputFormat={"MM/dd/yyyy"}
                  mask="__/__/____"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={3}>
              <div
                className="select-container"
                style={{ position: "relative" }}
              >
                <InputLabel
                  style={{
                    position: "absolute",
                    fontSize: 12,
                    top: "-18%",
                    left: "22%",
                    zIndex: "3",
                    backgroundColor: "white",
                  }}
                  id="select-label"
                >
                  Priority
                </InputLabel>
                <Select
                  margin="none"
                  fullWidth
                  labelId="select-label"
                  id="select-label"
                  value={useTodoFormOutputs.priority}
                  defaultValue={Priority.MEDIUM}
                  label="Priority"
                  onChange={useTodoFormOutputs.handleOnPrioritySelect}
                >
                  <MenuItem value={Priority.LOW}>
                    <PriorityIcon priority={Priority.LOW} size="medium" />
                  </MenuItem>
                  <MenuItem value={Priority.MEDIUM}>
                    <PriorityIcon priority={Priority.MEDIUM} size="medium" />
                  </MenuItem>
                  <MenuItem value={Priority.HIGH}>
                    <PriorityIcon priority={Priority.HIGH} size="medium" />
                  </MenuItem>
                </Select>
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
  );
}
export default TodoForm;
