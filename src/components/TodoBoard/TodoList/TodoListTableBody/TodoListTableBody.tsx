import { TableBody } from "@mui/material";
import { ITodo } from "../../../../interfaces/interfaces";
import ReadTodo from "../../../../models/read-todo";
import { TodoListType } from "../../TodoBoard";
import TodoItem from "./TodoItem";

type TodoListTableBodyProps = {
  todos: ReadTodo[];
  checkBoxColor: string;
  fontSize: string;
  onCheckToggle: Function;
  checkedItemIds: string[];
  onUpdate: Function;
};

const TodoListTableBody = (props: TodoListTableBodyProps) => {
  // todos here can be either completed or incompleted.
  const {
    todos,
    checkBoxColor,
    checkedItemIds,
    fontSize,
    onCheckToggle,
    onUpdate,
  } = props;
  console.log(todos);
  return (
    <TableBody>
      {todos.map((todo: ReadTodo, idx: number) => (
        <TodoItem
          key={todo.id}
          fontSize={fontSize}
          time={idx * 500}
          todo={todo}
          checked={checkedItemIds.indexOf(todo.id) !== -1}
          checkBoxColor={checkBoxColor}
          onCheckToggle={onCheckToggle}
          onUpdate={onUpdate}
        />
      ))}
    </TableBody>
  );
};

export default TodoListTableBody;
