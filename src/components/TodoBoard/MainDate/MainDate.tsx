import React from "react";
import TextDateTimePicker from "components/UI/Calendar/TextDateTimePicker";

type MainDateProps = {
  listDate: Date;
  onDateChange: Function;
};

const MainDate = (props: MainDateProps) => {
  // ANCHOR props
  const { listDate, onDateChange } = props;

  const handleCalendarDateAccept = (newDate: Date) => {
    // changes list's date
    onDateChange(newDate);
  };

  return (
    <TextDateTimePicker
      disablePast={false}
      displayTimeForToday={false}
      date={listDate}
      showClock={false}
      onDateAccept={handleCalendarDateAccept}
      fontSize={"x-large"}
    ></TextDateTimePicker>
  );
};

export default MainDate;
