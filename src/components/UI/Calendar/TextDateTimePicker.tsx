import { IconButton } from "@mui/material";
import { isToday } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";

import ModalCalendarTimePicker from "./ModalCalendarTimePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";

// NOTE MainDate

type TextDateTimePickerProps = {
  date: Date | undefined;
  displayTimeForToday: boolean;
  showClock: boolean;
  disablePast: boolean;
  iconForNullDate: boolean;
  onDateChange?: Function;
  onDateAccept: Function;
  textUnderLine?: any;
  fontSize: number | "small" | "medium" | "large" | "x-large";
};

const TextDateTimePicker = (props: TextDateTimePickerProps) => {

  // #region ANCHOR props
  const {
    date,
    disablePast,
    displayTimeForToday,
    showClock,
    iconForNullDate,
    onDateAccept,
    textUnderLine,
    fontSize,
  } = props;
  // #endregion props

  // #region ANCHOR States
  const [showModal, setShowModal] = useState(false);
  // #endregion

  // #region ANCHOR Handlers
  const handleTextDateClick = useCallback(() => {
    setShowModal(true);
  }, []);
  const handleCaledarDatePickChange = useCallback(
    (newDate: Date) => {
      if (!showClock) {
        onDateAccept(newDate);
        setShowModal(false);
      }
    },
    [showClock]
  );
  const handleCaledarDatePickAccept = useCallback((newDate: Date) => {
    onDateAccept(newDate);
    // close calendar
    setShowModal(false);
  }, []);

  const handleBackDropClick = useCallback(() => {
    setShowModal(false);
  }, []);
  // #endregion Handlers

  // #region ANCHOR Memo
  const title = useMemo(() => (
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
      {date === undefined ? (
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
  ), [date]);
  // #endregion Memo

  return showModal ? (
    <ModalCalendarTimePicker
      disablePast={disablePast}
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
  disablePast: true,
};
export default React.memo(TextDateTimePicker);
