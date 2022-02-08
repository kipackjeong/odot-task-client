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
import { createAddItemAction } from "context/actions/itemActionCreators";
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
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<Priority | string>(Priority.MEDIUM);

  // ANCHOR useEffect
  // useEffect(() => {}, [listDate]);

  // ANCHOR local var
  const todayDate = new Date(Date.now());

  // ANCHOR handlers
  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!isEmpty(task)) {
      setTyped(true);
      return;
    }
    let creatingTodo: CreateTodo = {
      task: task,
      createdAt: listDate,
      dueDate: dueDate,
      priority: priority,
    };

    const createdTodoFromServer: ReadTodo = await todoService.createTodo(
      creatingTodo
    );

    dispatch(createAddItemAction(createdTodoFromServer, TodoListType.Incompleted));
    setTask("");
    setTyped(false);
    onSubmit(true);
  };
  const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setTask(target.value);
    setTyped(true);
  };

  const handleOnDateAccept = (date: Date | null) => {
    if (!date || date < todayDate) {
      return;
    }
    setDueDate(date);
  };
  // error check
  const inputError: boolean = task.trim() === "" && typed ? true : false;

  return (
    <form style={{ height: "100%", width: "100%" }} onSubmit={handleOnSubmit}>
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
            value={task}
            label="What do you need to do?"
            onChange={handleOnChange}
            error={inputError}
          />
        </Grid>

        <Grid item md={4}>
          <Grid container justifyContent={"center"}>
            <Grid item md={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Due Date"
                  value={dueDate}
                  minDate={new Date("2021-01-01T00:00")}
                  onChange={handleOnDateAccept}
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
                  value={priority}
                  defaultValue={Priority.MEDIUM}
                  label="Priority"
                  onChange={(event) => {
                    const newValue: string | Priority = event.target.value;
                    if (newValue) {
                      setPriority(newValue);
                    }
                  }}
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
