import { isToday } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";

import ModalCalendarTimePicker from "./ModalCalendarTimePicker";

// NOTE MainDate

type TextDateTimePickerProps = {
  date: Date | undefined;
  displayTimeForToday: boolean;
  showClock: boolean;
  disablePast: boolean;
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
    [onDateAccept, showClock]
  );
  const handleCaledarDatePickAccept = useCallback((newDate: Date) => {
    onDateAccept(newDate);
    // close calendar
    setShowModal(false);
  }, [onDateAccept]);

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
      {date === undefined ? (""
      ) : displayTimeForToday && isToday(date) ? (
        "Today"
      ) : (
        date.toDateString()
      )}
    </p>
  ), [date, displayTimeForToday, fontSize, handleTextDateClick, textUnderLine]);
  // #endregion Memo

  return (
    <> {title}
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
    </>
  )
};

TextDateTimePicker.defaultProps = {
  displayTimeForToday: true,
  iconForNullDate: true,
  disablePast: true,
};
export default React.memo(TextDateTimePicker);
