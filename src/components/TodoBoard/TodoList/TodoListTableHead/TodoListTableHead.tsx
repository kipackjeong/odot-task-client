import {
  Checkbox,
  styled,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
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
        <StyledTableCell align="left">
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
        <StyledTableCell width="60%" align="center">
          <p style={{ fontSize }}> Task </p>
        </StyledTableCell>
        <StyledTableCell width="10%" align="center">
          Priority
        </StyledTableCell>
        <StyledTableCell width="15%" align="center">
          Due
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

export default TodoListTableHead;
