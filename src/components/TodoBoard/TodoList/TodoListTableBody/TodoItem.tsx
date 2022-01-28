import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  Checkbox,
  Grow,
  styled,
  StyledEngineProvider,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ReadTodo from "../../../../models/read-todo";
import UpdateTodo from "../../../../models/update-todo";
import "./TodoItem.css";
import PriorityIcon from "../../../UI/PriorityIcon/PriorityIcon";
import TextDateTimePicker from "components/UI/Calendar/TextDateTimePicker";
import { ConstructionOutlined } from "@mui/icons-material";

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
  renderTime: number;
  checkBoxColor: any;
  onCheckToggle: Function;
  onUpdate: Function;
};
function TodoItem(props: TodoItemProps) {
  // props
  const {
    todo,
    checked,
    renderTime,
    fontSize,
    onCheckToggle,
    checkBoxColor,
    onUpdate,
  } = props;

  /* ANCHOR state */
  const [dateToDisplay, setDateToDisplay] = useState(todo.dueDate);

  const [dateFormat, setDateFormat] = useState("MM/dd");
  const labelId = `checkbox-li  st-label-${todo.id}`;
  /* ANCHOR hooks */

  /* ANCHOR local var, component */
  const todayDate = useMemo(() => {
    return new Date(Date.now());
  }, []);

  /* ANCHOR useEffect */

  /* change date display format */
  useEffect(() => {
    if (!todo.dueDate) {
      return;
    }
    if (
      todo.dueDate.getDate() === todayDate.getDate() &&
      todo.dueDate.getMonth() === todayDate.getMonth() &&
      todo.dueDate.getFullYear() === todayDate.getFullYear()
    ) {
      setDateFormat("HH:mm");
      setDateToDisplay(todo.dueDate);
    } else {
      setDateFormat("MM/dd");
      setDateToDisplay(todo.dueDate);
    }
  }, [todo]);

  /* ANCHOR handlers */
  const handleDueDatePickerAccept = (newDueDate: Date | null) => {
    if (newDueDate! < todayDate) {
      return;
    }

    const updateTodo: UpdateTodo = new UpdateTodo(todo.id, {
      dueDate: newDueDate!,
    });
    setDateToDisplay(new Date(newDueDate!));
    onUpdate(updateTodo);
  };

  const handleDueDatePickerChange = (newDueDate: Date) => {
    if (newDueDate > todayDate) {
      return;
    }
  };

  return (
    <Grow in={todo !== null} timeout={renderTime}>
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
          <PriorityIcon priority={todo.priority} />
        </StyledTableCell>

        <StyledTableCell align="center">
          <StyledEngineProvider injectFirst>
            <div className="date-container">
              <TextDateTimePicker
                iconForNullDate={true}
                displayTimeForToday={true}
                date={dateToDisplay}
                showClock={true}
                onDateChange={handleDueDatePickerChange}
                onDateAccept={handleDueDatePickerAccept}
                fontSize={"medium"}
              />
            </div>
          </StyledEngineProvider>
        </StyledTableCell>
      </TableRow>
    </Grow>
  );
}

export default React.memo(TodoItem);
