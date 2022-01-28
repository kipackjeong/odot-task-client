import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton, Switch } from "@mui/material";
import TodoListType from "enums/todo-list-type.enum";

const ListChangeToggle = (props: any) => {
  // ANCHOR props
  const { listType, onChange } = props;

  // ANCHOR style
  const initialStyle = {
    transition: "all 0.4s ease-in-out",
  };
  const dynamicStyle = {
    transform: "scale(1.2)",
    transition: "all 0.4s ease-in-out",
  };

  // ANCHOR handler
  const toInCompletedListBtnClick = () => {
    if (listType === TodoListType.Incompleted) {
      return;
    }
    onChange();
  };
  const toCompletedListBtnClick = () => {
    if (listType === TodoListType.Completed) {
      return;
    }
    onChange();
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div>
        <IconButton
          style={
            listType === TodoListType.Incompleted ? dynamicStyle : initialStyle
          }
          onClick={toInCompletedListBtnClick}
        >
          <CheckCircleOutlineIcon color="disabled" fontSize="large" />
        </IconButton>
      </div>

      <Switch
        defaultChecked={listType === TodoListType.Completed}
        color="success"
        onChange={onChange}
      />

      <div>
        <IconButton
          style={
            listType === TodoListType.Completed ? dynamicStyle : initialStyle
          }
          onClick={toCompletedListBtnClick}
        >
          <CheckCircleOutlineIcon color="success" fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};
export default ListChangeToggle;
