import ReadTodo from "models/read-todo";

class DateConverter {

    /**
     * Converts single todo's date properties from type string to type Date.
     * @param todo 
     * @returns todo
     */
    public convertTodoDate(todo: ReadTodo) {

        // when todo.dueDate is null, then new Date()
        todo.dueDate = new Date(todo.dueDate ? todo.dueDate : new Date(Date.now()));
        todo.createdAt = new Date(todo.createdAt);
        todo.modifiedAt = new Date(todo.modifiedAt);

        return todo;
    }

    /**
     * Converts multiple todos' date properties from type string to type Date.
     * @param todos 
     * @returns todos
     */
    public convertTodosDate(todos: ReadTodo[]) {

        for (let todo of todos) {
            this.convertTodoDate(todo);
        }

        return todos;
    }
}

export default new DateConverter();