import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import todoListStyle from "../TodoList.module.css";
import DeleteButton from "./DeleteButton";
import DoneButton from "./DoneButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function ListHead(props: any) {
  return (
    <TableRow>
      <StyledTableCell align="left">
        <Checkbox
          edge="start"
          checked={false}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": "1215125" }}
        />
      </StyledTableCell>
      <StyledTableCell align="left">Task</StyledTableCell>
      <StyledTableCell align="left">Priority</StyledTableCell>
      <StyledTableCell align="left">Due</StyledTableCell>
    </TableRow>
  );
}

export default ListHead;
