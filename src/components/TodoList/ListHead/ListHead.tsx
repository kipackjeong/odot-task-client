import {
  Checkbox,
  styled,
  TableCell,
  tableCellClasses,
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

function ListHead(props: any) {
  // props
  const { onCheckToggle, checked } = props;

  return (
    <TableRow>
      <StyledTableCell align="left">
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": "1215125" }}
          onClick={onCheckToggle}
        />
      </StyledTableCell>
      <StyledTableCell width="40%" align="center">
        Task
      </StyledTableCell>
      <StyledTableCell width="10%" align="center">
        Priority
      </StyledTableCell>
      <StyledTableCell width="30%" align="center">
        Due
      </StyledTableCell>
    </TableRow>
  );
}

export default ListHead;
