import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TodoListType } from "../../TodoBoard";
import listChangeToggle from "./ListChangeToggle.module.css";
import slide from "./slide.module.css";
import Switch from "@mui/material/Switch";
import { IconButton } from "@mui/material";

const ListChangeToggle = (props: any) => {
  // ANCHOR props
  const { listType, onToggle } = props;

  // ANCHOR style
  const initialStyle = {
    transition: "all 700 ease-in-out",
  };
  const dynamicStyle = {
    transform: "scale(1.4)",
    transition: "all 700 ease-in-out",
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
        >
          <CheckCircleOutlineIcon
            color="disabled"
            fontSize="large"
            onClick={onToggle}
          />
        </IconButton>
      </div>

      <Switch
        aria-label="listtype-toggler"
        defaultChecked={listType === TodoListType.Completed}
        color="success"
        onChange={onToggle}
      />

      <div>
        <IconButton
          style={
            listType === TodoListType.Completed ? dynamicStyle : initialStyle
          }
        >
          <CheckCircleOutlineIcon
            color="success"
            fontSize="large"
            onClick={onToggle}
          />
        </IconButton>
      </div>
    </div>
  );
};
export default ListChangeToggle;
