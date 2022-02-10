import { Select, MenuItem, InputLabel } from "@mui/material";
import Priority from "enums/priority.enum";
import PriorityIcon from "../PriorityIcon/PriorityIcon";

type PrioritySelectorProps = {
  priority: Priority;
  labelOn?: boolean;
  onSelect: any;
};

/**
 * @param props  priority , onSelect, labelOn?
 * @returns 
 */
const PrioritySelector = (props: PrioritySelectorProps) => {
  return (
    <>
      {props.labelOn && (
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
        labelId={props.labelOn ? "select-label" : "false"}
        id="select-label"
        value={props.priority}
        label="Priority"
        onChange={props.onSelect}
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
