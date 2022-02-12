import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import "./TodoForm.css";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Priority from "enums/priority.enum";
import PriorityIcon from "../../UI/PriorityIcon/PriorityIcon";
import TaskInput from "components/UI/TaskInput/TaskInput";
import useTodoForm, { } from "hooks/todo-form/todo-form.hook";
import PrioritySelector from "components/UI/PrioritySelector/PrioritySelector";
import { useTodoFormOutputs } from '../../../hooks/todo-form/todo-form.hook';

type TodoFormProp = {
  listDate: Date;
};

function TodoForm(props: TodoFormProp) {

  /* Hook */
  const {
    task, priority, dueDate, showInputError,
    handleOnSubmit, handleOnChange, handleOnPrioritySelect, handleOnDateAccept,
  }: useTodoFormOutputs = useTodoForm({ listDate: props.listDate });


  return (
    <form style={{ height: "100%", width: "100%" }} onSubmit={handleOnSubmit}>
      <Grid
        container
        width={"100%"}
        height={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item width={"90%"} md={4} sm={4}>
          <TaskInput
            value={task}
            label="What do you need to do?"
            onChange={handleOnChange}
            error={showInputError}
          />
        </Grid>

        <Grid item md={4} sm={4}>
          <Grid container justifyContent={"center"}>
            <Grid item md={8} sm={8}>
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

            <Grid item md={3} sm={4}>
              <div
                className="select-container"
                style={{ position: "relative" }}
              >
                <PrioritySelector priority={priority} onSelect={handleOnPrioritySelect} />
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={2} sm={4}>
          <Button style={{ border: "0.05px solid" }} color="success" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default TodoForm;
