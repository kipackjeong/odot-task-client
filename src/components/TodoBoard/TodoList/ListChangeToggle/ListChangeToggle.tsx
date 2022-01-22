import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TodoListType } from "../../TodoBoard";
import listChangeToggle from "./ListChangeToggle.module.css";

const ListChangeToggle = (props: any) => {
  // ANCHOR props
  const { listType, onToggle } = props;

  // ANCHOR style
  const toggleColor = "rgb(46, 125, 50)";
  const toggleClass = "toggle";

  const togglerButtonClass =
    listType === TodoListType.Completed ? "completed" : "incompleted";

  const toggleHandler = () => {
    const toggler = document.getElementById("toggle");
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
        <CheckCircleOutlineIcon
          color="disabled"
          fontSize="large"
          onClick={toggleHandler}
        />{" "}
      </div>
      <label className={listChangeToggle.switch}>
        <input id="toggle" type="checkbox" onClick={onToggle} />
        <span
          className={`${listChangeToggle.slider}  ${listChangeToggle.round}`}
        ></span>
      </label>
      <div>
        <CheckCircleOutlineIcon
          color="success"
          fontSize="large"
          onClick={toggleHandler}
        />
      </div>
    </div>
  );
};
export default ListChangeToggle;
