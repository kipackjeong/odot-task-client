import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  Grow,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
} from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import DateSelector from "../../Calendar/DateSelector";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ReadTodo from "../../../../models/read-todo";
import UpdateTodo from "../../../../models/update-todo";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

type TodoItemProps = {
  todo: ReadTodo;
  checked: boolean;
  fontSize: string;
  checkBoxColor: string;
  onCheckToggle: Function;
  onUpdate: Function;
};
function TodoItem(props: any) {
  // props
  const { todo, checked, fontSize, onCheckToggle, checkBoxColor, onUpdate } =
    props;

  // ANCHOR state
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [dateFormat, setDateFormat] = useState("MM/dd");
  const labelId = `checkbox-list-label-${todo.id}`;

  // ANCHOR local var.
  const todayYear = useMemo(() => {
    return new Date(Date.now()).getFullYear();
  }, []);

  const todoDueYear = useMemo(() => {
    return new Date(dueDate).getFullYear();
  }, [dueDate]);

  // ANCHOR useEffect
  useEffect(() => {
    if (todayYear !== todoDueYear) {
      setDateFormat("MM/yyyy");
    }
  }, []);
  useEffect(() => {
    console.log("setDueDate");
    setDueDate(todo.dueDate);
  }, [todo.dueDate]);

  // ANCHOR handlers
  const handleDueDatePickerSave = (newDueDate: Date) => {
    const updateTodo: UpdateTodo = new UpdateTodo(todo.id, {
      dueDate: newDueDate,
    });

    setDueDate(newDueDate);
    onUpdate(updateTodo);
  };

  return (
    <Grow in={todo !== null} timeout={700}>
      <TableRow key={todo.id}>
        <StyledTableCell
          height={"5px"}
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <Checkbox
            aria-label={labelId}
            edge="start"
            color={checkBoxColor}
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": "1215125" }}
            onClick={() => {
              onCheckToggle(todo.id);
            }}
          />
        </StyledTableCell>
        <StyledTableCell height={"5px"} width={"40%"} align="center">
          <p style={{ fontSize }}> {todo.task}</p>
        </StyledTableCell>
        <StyledTableCell width={"10%"} align="center">
          <p style={{ fontSize }}> {todo.priority}</p>
        </StyledTableCell>
        {/* TODO Implement calendar pick that will:
          - change current todo's date.
          - add current todo to todosToBeModified
         */}

        <StyledTableCell align="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              value={dueDate}
              onAccept={handleDueDatePickerSave}
              onClose={() => {
                console.log("datepicker closed");
              }}
              onChange={(date) => {}}
              onError={console.log}
              minDate={new Date("2018-01-01T00:00")}
              inputFormat={dateFormat}
              mask="__/__"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </StyledTableCell>
      </TableRow>
    </Grow>
  );
}

export default TodoItem;
