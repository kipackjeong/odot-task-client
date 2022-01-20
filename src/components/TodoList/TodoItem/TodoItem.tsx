import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function todoItem(props: any) {
  const { todo, checked, onCheckToggle } = props;
  const labelId = `checkbox-list-label-${todo.id}`;

  return (
    <TableRow key={todo.id}>
      <StyledTableCell>
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": "1215125" }}
          onClick={() => {
            onCheckToggle(todo.id);
          }}
        />
      </StyledTableCell>
      <StyledTableCell width={"40%"} align="left">
        {todo.task}
      </StyledTableCell>
      <StyledTableCell width={"10%"} align="left">
        {todo.priority}
      </StyledTableCell>
      <StyledTableCell width={"30%"} align="left">
        {todo.dueDate}
      </StyledTableCell>
    </TableRow>
  );
}

export default todoItem;
