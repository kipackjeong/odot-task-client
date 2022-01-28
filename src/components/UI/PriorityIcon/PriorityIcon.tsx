import Priority from "enums/priority.enum";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";

type PriorityIconProps = {
  priority: Priority;
  size?: "small" | "inherit" | "large" | "medium" | undefined;
};
const PriorityIcon = (props: PriorityIconProps) => {
  const { priority, size = "small" } = props;

  switch (priority) {
    case Priority.LOW:
      return (
        <AirlineSeatReclineExtraOutlinedIcon fontSize={size} color="success" />
      );
    case Priority.MEDIUM:
      return <DirectionsWalkOutlinedIcon fontSize={size} color="warning" />;
    case Priority.HIGH:
      return <DirectionsRunOutlinedIcon fontSize={size} color="error" />;
  }
};

export default PriorityIcon;
