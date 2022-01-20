import React, { useMemo } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import calendarStyle from "./Calendar.module.css";

//TODO: make component that will toggle Month/Year picker.

export default function Calendar() {
  const minDate = useMemo(() => {
    return new Date("2020-01-01T00:00:00.000");
  }, []);

  const maxDate = useMemo(() => {
    return new Date("2034-01-01T00:00:00.000");
  }, []);

  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker
        className={calendarStyle.calendar}
        date={date}
        onChange={(newDate) => setDate(newDate)}
        minDate={minDate}
        maxDate={maxDate}
      />

      {/* <Grid item xs={12} md={6}>
          <MonthPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <YearPicker
            date={date}
            isDateDisabled={() => false}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid> */}
    </LocalizationProvider>
  );
}
