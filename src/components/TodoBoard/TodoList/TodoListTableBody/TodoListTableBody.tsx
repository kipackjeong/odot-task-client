import { TableBody } from "@mui/material";
import { ITodo } from "../../../../interfaces/interfaces";
import ReadTodo from "../../../../models/read-todo";
import TodoListType from "enums/todo-list-type.enum";
import TodoItem from "./TodoItem";

type TodoListTableBodyProps = {
  todos: ReadTodo[];
  listType: TodoListType;
  checkBoxColor: string;
  fontSize: string;
  renderAll: boolean;
  onCheckToggle: Function;
  checkedItemIds: string[];
  onUpdate: Function;
};

const TodoListTableBody = (props: TodoListTableBodyProps) => {
  // todos here can be either completed or incompleted.
  const {
    todos,
    listType,
    checkBoxColor,
    checkedItemIds,
    fontSize,
    renderAll,
    onCheckToggle,
    onUpdate,
  } = props;

  return (
    <TableBody>

      {(todos.map((todo: ReadTodo, idx: number) => (
        <TodoItem
          key={todo.id}
          listType={listType}
          fontSize={fontSize}
          renderTime={renderAll ? idx * 500 : 500}
          todo={todo}
          checked={checkedItemIds.indexOf(todo.id) !== -1}
          checkBoxColor={checkBoxColor}
          onCheckToggle={onCheckToggle}
          onUpdate={onUpdate}
        />
      )))}
    </TableBody>
  );
};

export default TodoListTableBody;
