import React, {
  EventHandler,
  KeyboardEventHandler,
  MouseEvent,
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Checkbox,
  Grow,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  StyledEngineProvider,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import UpdateTodo from "models/update-todo";
import "./TodoItem.css";
import TextDateTimePicker from "components/UI/Calendar/TextDateTimePicker";
import { ConstructionOutlined } from "@mui/icons-material";
import Priority from "enums/priority.enum";
import PrioritySelector from "components/UI/PrioritySelector/PrioritySelector";
import ReadTodo from "models/read-todo";
import TaskInput from "components/UI/TaskInput/TaskInput";

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

  // #region ANCHOR State

  const [dateToDisplay, setDateToDisplay] = useState(todo.dueDate);
  const [dateFormat, setDateFormat] = useState("MM/dd");
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [task, setTask] = useState<string>(todo.task);
  const [taskInputOn, setTaskInputOn] = useState<boolean>(false);
  // #endregion State

  // #region ANCHOR Effects
  /* change date display format */
  useEffect(() => {
    const decideDateFormat = function () {
      if (!todo.dueDate) {
        return;
      }
      if (
        todo.dueDate.getDate() === todayDate.getDate() &&
        todo.dueDate.getMonth() === todayDate.getMonth() &&
        todo.dueDate.getFullYear() === todayDate.getFullYear()
      )
        setDateFormat("HH:mm");
      else setDateFormat("MM/dd");
      setDateToDisplay(todo.dueDate);
    };

    decideDateFormat();
    setPriority(todo.priority);
    setTask(todo.task);
  }, [todo]);
  // #endregion

  // #region ANCHOR Handlers
  const handleTaskClick = () => {
    setTaskInputOn(true);
  };

  const handleTaskChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setTask(event.currentTarget.value);
  };

  const handleTaskSubmit: EventHandler<
    SyntheticEvent<HTMLInputElement>
  > = (event:any) => {
    const updateTodo: UpdateTodo = new UpdateTodo(todo.id, {
      task,
    });
    setTaskInputOn(false);
    onUpdate(updateTodo);
  };

  const handlePrioritySelect = (event: any) => {
    console.log('handlePrioritySelect called')
    const newPriority: Priority = event.target.value as Priority;
    const updateTodo: UpdateTodo = new UpdateTodo(todo.id, {
      priority: newPriority,
    });

    setPriority(newPriority);
    onUpdate(updateTodo);
  };
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
  // #endregion Handlers

  // #region ANCHOR Memo
  const todayDate = useMemo(() => {
    return new Date(Date.now());
  }, []);
  const labelId = useMemo(() => `checkbox-li  st-label-${todo.id}`, [todo]);
  // #endregion Memo

  return (
    <Grow in={todo !== null} timeout={renderTime}>
      <TableRow key={todo.id} className="todo-row">
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
          {taskInputOn ? (
            <TaskInput
              fullWidth={false}
              value={task}
              onChange={handleTaskChange}
              onSubmit={handleTaskSubmit}
              error={false}
            />
          ) : (
            <p
              style={{ fontSize, cursor: "pointer" }}
              onClick={handleTaskClick}
            >
              {task}
            </p>
          )}
        </StyledTableCell>

        <StyledTableCell width={"10%"} align="center">
          <PrioritySelector
            priority={priority}
            labelOn={false}
            onSelect={handlePrioritySelect}
          />
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
