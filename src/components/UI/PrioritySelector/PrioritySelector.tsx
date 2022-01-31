import { Select, MenuItem, SelectChangeEvent, InputLabel } from "@mui/material";
import Priority from "enums/priority.enum";
import { ReactEventHandler } from "react";
import PriorityIcon from "../PriorityIcon/PriorityIcon";

type PrioritySelectorProps = {
  priority: Priority;
  labelOn?: boolean;
  onSelect: ReactEventHandler;
};

const PrioritySelector = (props: PrioritySelectorProps) => {
  const { priority, labelOn, onSelect } = props;
  return (
    <>
      {labelOn && (
        <InputLabel
          style={{
            position: "absolute",
            fontSize: 12,
            top: "-18%",
            left: "22%",
            zIndex: "3",
            backgroundColor: "white",
          }}
          id="select-label"
        >
          Priority
        </InputLabel>
      )}
      <Select
        margin="none"
        fullWidth
        labelId={labelOn ? "select-label" : "false"}
        id="select-label"
        value={priority}
        defaultValue={Priority.MEDIUM}
        label="Priority"
        onSelect={onSelect}
      >
        <MenuItem value={Priority.LOW}>
          <PriorityIcon priority={Priority.LOW} size="medium" />
        </MenuItem>
        <MenuItem value={Priority.MEDIUM}>
          <PriorityIcon priority={Priority.MEDIUM} size="medium" />
        </MenuItem>
        <MenuItem value={Priority.HIGH}>
          <PriorityIcon priority={Priority.HIGH} size="medium" />
        </MenuItem>
      </Select>
    </>
  );
};

PrioritySelector.defaultProps = {
  labelOn: true,
};

export default PrioritySelector;
