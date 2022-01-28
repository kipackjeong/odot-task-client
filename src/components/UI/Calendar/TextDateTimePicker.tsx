import { IconButton } from "@mui/material";
import { isSameDay, isToday } from "date-fns";
import React, { useMemo, useState } from "react";

import ModalCalendarTimePicker from "./ModalCalendarTimePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";

// NOTE MainDate

type TextDateTimePickerProps = {
  date: Date | undefined;
  displayTimeForToday: boolean;
  showClock: boolean;
  iconForNullDate: boolean;
  onDateChange?: Function;
  onDateAccept: Function;
  textUnderLine?: any;
  fontSize: number | "small" | "medium" | "large" | "x-large";
};

const TextDateTimePicker = (props: TextDateTimePickerProps) => {
  // ANCHOR props
  const {
    date,
    displayTimeForToday,
    showClock,
    iconForNullDate,
    onDateAccept,
    textUnderLine,
    fontSize,
  } = props;
  const [showModal, setShowModal] = useState(false);
  // ANCHOR handlers
  const handleTextDateClick = () => {
    setShowModal(true);
  };
  const handleCaledarDatePickChange = (newDate: Date) => {
    if (!showClock) {
      onDateAccept(newDate);
      setShowModal(false);
    }
  };
  const handleCaledarDatePickAccept = (newDate: Date) => {
    onDateAccept(newDate);

    // close calendar
    setShowModal(false);
  };
  const handleBackDropClick = () => {
    setShowModal(false);
  };

  // ANCHOR local
  console.log("TextDateTimePicker: ", date);

  const title = useMemo(() => {
    return (
      <p
        style={{
          fontSize: fontSize,
          color: "black",
          fontWeight: "normal",
          cursor: "pointer",
          textDecorationLine: textUnderLine,
          textUnderlineOffset: "25%",
        }}
        onClick={handleTextDateClick}
      >
        {!date ? (
          iconForNullDate ? (
            <IconButton style={{ width: "50%" }} onClick={handleTextDateClick}>
              <DateRangeIcon fontSize="medium" />
            </IconButton>
          ) : (
            ""
          )
        ) : displayTimeForToday && isToday(date) ? (
          date.toLocaleTimeString()
        ) : (
          date.toDateString()
        )}
      </p>
    );
  }, [date]);

  return showModal ? (
    <ModalCalendarTimePicker
      showModal={showModal}
      displayTimeForToday={displayTimeForToday}
      date={date}
      onChange={handleCaledarDatePickChange}
      onAccept={handleCaledarDatePickAccept}
      showClock={showClock}
      onBackDropClick={handleBackDropClick}
    />
  ) : (
    title
  );
};

TextDateTimePicker.defaultProps = {
  displayTimeForToday: true,
  iconForNullDate: true,
};
export default TextDateTimePicker;
