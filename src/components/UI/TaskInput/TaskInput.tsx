import { FormGroup, TextField } from "@mui/material";
import React, { KeyboardEventHandler, SyntheticEvent } from "react";
// import "./TaskInput.css";

type TaskInputProps = {
  value: string;
  fullWidth?: boolean;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit?: Function;
  error: boolean;
};

const TaskInput = (props: TaskInputProps) => {
  const { value, label, onChange, onSubmit, error, fullWidth } = props;

  const handleOnKeyPress = (event: any) => {
    if (onSubmit && event.key == "Enter") onSubmit();
  };

  const handleBlur = () => {
    if (onSubmit) onSubmit();
  };
  return (
    <TextField
      sx={{ textAlign: "center" }}
      type="text"
      fullWidth={fullWidth}
      color="success"
      label={label}
      variant="standard"
      value={value}
      onChange={onChange}
      onKeyPress={handleOnKeyPress}
      onBlur={handleBlur}
      error={error}
    />
  );
};

export default TaskInput;
