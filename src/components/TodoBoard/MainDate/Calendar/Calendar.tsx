import React, { useMemo } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import calendarStyle from "./Calendar.module.css";
import { Modal } from "@mui/material";

export default function Calendar(props: any) {
  const minDate = useMemo(() => {
    return new Date("2020-01-01T00:00:00.000");
  }, []);

  const maxDate = useMemo(() => {
    return new Date("2034-01-01T00:00:00.000");
  }, []);
  // props
  const { showCalendar, date, onChange } = props;
  return (
    <Modal open={showCalendar}>
      <div className={calendarStyle.container}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            className={calendarStyle.calendar}
            date={date}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </div>
    </Modal>
  );
}
