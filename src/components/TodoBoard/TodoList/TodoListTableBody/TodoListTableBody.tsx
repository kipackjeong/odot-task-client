import { TableBody } from "@mui/material";
import { ITodo } from "../../../../interfaces/interfaces";
import ReadTodo from "../../../../models/read-todo";
import { TodoListType } from "../../TodoBoard";
import TodoItem from "./TodoItem";

type TodoListTableBodyProps = {
  todos: ReadTodo[];
  checkBoxColor: string;
  fontSize: string;
  handleCheckToggle: Function;
  checkedItemIds: string[];
};

const TodoListTableBody = (props: TodoListTableBodyProps) => {
  // todos here can be either completed or incompleted.
  const { todos, checkBoxColor, checkedItemIds, fontSize, handleCheckToggle } =
    props;
  console.log(todos);
  return (
    <TableBody>
      {todos.map((todo: ReadTodo, idx: number) => (
        <TodoItem
          key={todo.id}
          time={idx * 500}
          todo={todo}
          fontSize={fontSize}
          checkBoxColor={checkBoxColor}
          onCheckToggle={handleCheckToggle}
          checked={checkedItemIds.indexOf(todo.id) !== -1}
        />
      ))}
    </TableBody>
  );
};

export default TodoListTableBody;
