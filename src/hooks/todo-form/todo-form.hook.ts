import { createAddItemAction } from "context/actions/item.action.creator";
import AppCtx from "context/app-context";
import Priority from "enums/priority.enum";
import TodoListType from "enums/todo-list-type.enum";
import CreateTodo from "models/create-todo";
import ReadTodo from "models/read-todo";
import { useContext, useState, SyntheticEvent, EventHandler, useMemo } from "react";
import todoService from "service/todo.service";
import { isEmpty } from "utilities/validation.utility";

export type useTodoFormOutputs = {
    task: string;
    priority: Priority;
    dueDate: Date | undefined;
    showInputError: boolean;
    handleOnChange: any;
    handleOnSubmit: any;
    handleOnPrioritySelect: any;
    handleOnDateAccept: any;
};

type useTodoFormArgs = {
    listDate: Date,
}

const useTodoForm = (args: any) => {

    // #region ANCHOR context
    const { dispatch } = useContext(AppCtx);

    // #endregion

    // #region ANCHOR props
    const { listDate } = args;

    // #endregion

    // #region ANCHOR state
    const [task, setTask] = useState("");
    const [typed, setTyped] = useState(false);
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);

    // #endregion

    // #region ANCHOR useEffect
    // #endregion

    // #region ANCHOR Memo
    const todayDate: Date = useMemo(() => {
        return new Date(Date.now());
    }, [])

    // error check
    const showInputError: boolean = useMemo(() => {
        return task.trim() === "" && typed ? true : false;
    }, [])

    // #endregion

    // #region ANCHOR handlers

    /** handles form submit. receives createdTodo from calling post method on api, then adds that createdTodo in context.state.inCompTodos.
     * @module useTodoForm
     * @param event 
     * @returns 
     */
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
    };

    /** handles changes on task text input. Calls setTask() and setTyped() in useTodoForm hook.
     * @module useTodoForm
     * @param event 
     */
    const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const newTask = target.value;

        setTask(newTask);
        setTyped(true);
    };

    /** handles dueDate selection. When user selects date for dueDate, calls setDueDate() to update dueDate state in useTodoForm hook. 
     * @param acceptedDateStr
     * @returns 
     */
    const handleOnDateAccept = (acceptedDateStr: string) => {
        if (acceptedDateStr) {
            const acceptedDate = new Date(acceptedDateStr);
            if (!acceptedDate || acceptedDate < todayDate) {
                return;
            }
            setDueDate(acceptedDate);
        }

    };

    /** Sets a creating todo's priority.
     * 
     * @module useTodoForm
     * @param event 
     */
    const handleOnPrioritySelect = (event: any) => {

        const newPriority: Priority = event.target.value as Priority;

        setPriority(newPriority);
    }
    // #endregion handlers


    return {
        task, priority, dueDate, showInputError,
        handleOnSubmit, handleOnChange, handleOnPrioritySelect, handleOnDateAccept,
    };
}

export default useTodoForm