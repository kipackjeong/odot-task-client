import { Label } from "@mui/icons-material";
import {
  Checkbox,
  styled,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TableSortLabel,
  TextareaAutosize,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TodoListTableHead(props: any) {
  // ANCHOR props
  const { fontSize, onCheckToggle, checked, checkBoxColor } = props;

  // ANCHOR handlers

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell
          align="left"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": "1215125" }}
            color={checkBoxColor}
            onClick={onCheckToggle}
          />
        </StyledTableCell>
        <StyledTableCell width="40%" align="center">
          <p style={{ fontSize }}> Task </p>
        </StyledTableCell>
        <StyledTableCell width="10%" align="center">
          Priority
        </StyledTableCell>
        <StyledTableCell width="17%" align="center">
          Due
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

export default TodoListTableHead;
