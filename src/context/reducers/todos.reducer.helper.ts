import ReadTodo from "models/read-todo";
import UpdateTodo from "models/update-todo";
import TodoListType from 'enums/todo-list-type.enum';

/**
 * Updates the list that updateTodo is currently in.
 * @param newTodos 
 * @param updateTodo 
 */
export const updateCurrentList = (newTodos: ReadTodo[], updateTodo: UpdateTodo) => {
    const index = newTodos.findIndex((todo) => todo.id === updateTodo.id);

    const newTodo = { ...newTodos[index], ...updateTodo.option };
    // swap old item with updated item.
    newTodos[index] = newTodo;

    console.log("newTodos in helper: ", newTodos)
}

/**
 * Transfers todo in current list to other list.
 * @param updateTodo 
 * @param compTodos 
 * @param inCompTodos 
 * @param listType 
 * @return ReadTodo [] a updated current list.
 */
export const transferTodoToOtherList = (updateTodo: UpdateTodo, compTodos: ReadTodo[], inCompTodos: ReadTodo[], listType: TodoListType) => {

    let todoIndex;
    switch (listType) {
        case TodoListType.Completed:
            // find index from current list
            todoIndex = compTodos.findIndex(compTodo => compTodo.id === updateTodo.id)

            // add to complement list
            inCompTodos.push(compTodos[todoIndex]);

            // remove from current list
            compTodos.splice(todoIndex, 1);
            return compTodos;

        case TodoListType.Incompleted:
            // find index from current list
            todoIndex = inCompTodos.findIndex(inCompTodos => inCompTodos.id === updateTodo.id)

            // add to complement list
            compTodos.push(inCompTodos[todoIndex]);
            // remove from current list
            inCompTodos.splice(todoIndex, 1);
            console.log(inCompTodos);
            console.log(compTodos);
            return inCompTodos;
        default:
            return [];
    }

}
