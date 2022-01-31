import {
  LocalizationProvider,
  StaticTimePicker,
  StaticDatePicker,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Modal,
  TextField,
  ButtonGroup,
  IconButton,
  Alert,
  Dialog,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import styles from "./Calendar.module.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { isPast } from "date-fns";
import { TimePickerView } from "@mui/lab/TimePicker/shared";

type ModalCalendarTimePickerProps = {
  date: Date | undefined;
  displayTimeForToday: boolean;
  disablePast: boolean;
  onChange: Function;
  onAccept: Function;
  showModal: boolean;
  showClock: boolean;
  onBackDropClick: Function;
};
const AlertBar = (props: any) => {
  const { text } = props;

  return (
    <Alert color="error" style={{}}>
      {text}
    </Alert>
  );
};
const ModalCalendarTimePicker = (props: ModalCalendarTimePickerProps) => {
  const minDate = useMemo(() => {
    return new Date("2020-01-01T00:00:00.000");
  }, []);

  const maxDate = useMemo(() => {
    return new Date("2034-01-01T00:00:00.000");
  }, []);

  // ANCHOR props
  const {
    date,
    disablePast,
    onChange,
    onAccept,
    showModal,
    showClock, // whether to have clock view or not.
    onBackDropClick,
  } = props;

  // ANCHOR state
  const [onClock, setOnClock] = useState(false);
  const [showAlertBar, setShowAlertBar] = useState(false);
  const [onGoingDate, setOnGoingDate] = useState<Date | undefined>(date);

  // ANCHOR handlers
  const handleClockIconClick = () => {
    if (!onGoingDate) {
      return;
    }
    // when chosen date is past, and user clicks on clock to set a time.
    if (!isPast(onGoingDate)) setOnClock(true);
    return;
  };
  const handleCalendarIconClick = () => {
    setOnClock(false);
  };

  const handleClockPickerViewChange = (view: TimePickerView) => {};

  const handleClockPickerChange = useCallback((newDate: Date | null) => {}, []);

  const handleClockPickerAccept = (newDate: Date | null) => {
    if (!newDate) {
      return;
    }
    if (isPast(newDate)) {
      setShowAlertBar(true);
      return;
    }
    onAccept(newDate);
    setOnClock(false);
  };

  const handleDatePickerAccept = useCallback(
    (newDate: Date | null) => {
      if (!newDate) {
        return;
      }
      if (showClock) {
        // when date & clock calendar select
        setOnClock(true);
        setOnGoingDate(newDate);
      } else {
        // when only date
        onChange(newDate);
      }
    },
    [showClock, onChange]
  );

  const handleDatePickerChange = useCallback((newDate: Date | null) => {
    if (!newDate) {
      // return;
    }
    console.log("Date Chosen: ", newDate);
  }, []);

  const handleBackDropClick = useCallback(() => {
    onBackDropClick();
  }, []);

  /* ANCHOR helper */
  // ANCHOR locals
  return (
    <>
      <Dialog
        transitionDuration={500}
        hideBackdrop
        onBackdropClick={() => {
          setShowAlertBar(false);
        }}
        open={showAlertBar}
        style={{
          width: "100%",
        }}
      >
        <AlertBar text="Cannot select past for due date." />
      </Dialog>
      <Dialog
        className={styles.modal}
        style={{
          margin: "auto",
          width: "100%",
        }}
        open={showModal}
        onBackdropClick={handleBackDropClick}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {onClock ? (
            showClock ? (
              <StaticTimePicker
                displayStaticWrapperAs="desktop"
                value={onGoingDate}
                onAccept={handleClockPickerAccept}
                onViewChange={handleClockPickerViewChange}
                onChange={handleClockPickerChange}
                renderInput={(params) => <TextField {...params} />}
              />
            ) : null
          ) : (
            <StaticDatePicker
              disablePast={disablePast}
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={date}
              onAccept={handleDatePickerAccept}
              onChange={handleDatePickerChange}
              renderInput={(params) => <TextField {...params} />}
            />
          )}

          <ButtonGroup style={{ width: "100%", backgroundColor: "white" }}>
            {showClock ? (
              <>
                <IconButton
                  style={{ width: "50%" }}
                  onClick={handleCalendarIconClick}
                >
                  <DateRangeIcon fontSize="large" />
                </IconButton>
                <IconButton
                  style={{ width: "50%" }}
                  onClick={handleClockIconClick}
                >
                  <AccessTimeIcon fontSize="large" />
                </IconButton>
              </>
            ) : null}
          </ButtonGroup>
        </LocalizationProvider>
      </Dialog>
    </>
  );
};

ModalCalendarTimePicker.defaultProps = {
  disablePast: true,
};

export default ModalCalendarTimePicker;
