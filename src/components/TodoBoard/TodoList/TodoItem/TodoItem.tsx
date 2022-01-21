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
  // props
  const { todo, checked, onCheckToggle, checkBoxColor } = props;

  const labelId = `checkbox-list-label-${todo.id}`;

  return (
    <TableRow key={todo.id}>
      <StyledTableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Checkbox
          aria-label={labelId}
          edge="start"
          color={checkBoxColor}
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": "1215125" }}
          onClick={() => {
            onCheckToggle(todo.id);
          }}
        />
      </StyledTableCell>
      <StyledTableCell width={"40%"} align="center">
        {todo.task}
      </StyledTableCell>
      <StyledTableCell width={"10%"} align="center">
        {todo.priority}
      </StyledTableCell>
      <StyledTableCell width={"30%"} align="center">
        {todo.dueDate}
      </StyledTableCell>
    </TableRow>
  );
}

export default todoItem;
