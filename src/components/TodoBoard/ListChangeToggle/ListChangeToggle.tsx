import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import todoListToggleStyle from "./TodoListToggle.module.css";

const ListChangeToggle = (props: any) => {
  // props
  const { onToggle } = props;

  // style
  const toggleColor = "rgb(46, 125, 50)";
  const toggleClass = "toggle";

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
        <CheckCircleOutlineIcon color="disabled" fontSize="large" />{" "}
      </div>
      <label className={todoListToggleStyle.switch}>
        <input type="checkbox" onClick={onToggle} />
        <span
          className={`${todoListToggleStyle.slider}  ${todoListToggleStyle.round}`}
        ></span>
      </label>
      <div>
        <CheckCircleOutlineIcon color="success" fontSize="large" />
      </div>
    </div>
  );
};
export default ListChangeToggle;
