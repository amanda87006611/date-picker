import React, { useState, useRef, useEffect } from "react";

//style
import styles from "./datePicker.module.scss";

//date format library
import moment from "moment";

//icons
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const DatePicker = ({ isDatesCrossMonth }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const datePickerRef = useRef();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (date) => {
    if (!startDate) {
      setStartDate(date);
    } else if (
      (!endDate && date > startDate) ||
      (!endDate &&
        moment(date).format("YYYY-MM-DD") ===
          moment(startDate).format("YYYY-MM-DD"))
    ) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handleDocumentClick = (e) => {
    if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  const handleDeleteDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(currentYear, currentMonth + 1);
    setCurrentYear(nextMonthDate.getFullYear());
    setCurrentMonth(nextMonthDate.getMonth());
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentYear, currentMonth - 1);
    setCurrentYear(prevMonthDate.getFullYear());
    setCurrentMonth(prevMonthDate.getMonth());
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];

    return `${month}月${day}日 週${weekDay}`;
  };

  const renderDate = (date, isCurrentMonth) => {
    function renderDateStyle() {
      if (!isCurrentMonth && !isDatesCrossMonth) {
        return `${styles.date} ${styles.disabledDate}`;
      } else if (
        moment(date).format("YYYY-MM-DD") ===
        moment(new Date()).format("YYYY-MM-DD")
      ) {
        return `${styles.date} ${styles.today}`;
      } else if (
        (startDate && date.getTime() === startDate.getTime()) ||
        (startDate && endDate && date > startDate && date <= endDate)
      ) {
        return `${styles.date} ${styles.activeDate}`;
      } else {
        return styles.date;
      }
    }

    return (
      <button
        className={renderDateStyle()}
        onClick={() => handleDateClick(date)}
        aria-label={`${date.getDate()}日`}>
        <span>{date.getDate()}日</span>
      </button>
    );
  };

  const renderCalendar = () => {
    const startDateOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endDateOfMonth = new Date(currentYear, currentMonth, 0);
    const startingDayOfWeek = startDateOfMonth.getDay();
    const daysInMonth = endDateOfMonth.getDate();
    const totalDays = startingDayOfWeek + daysInMonth;
    const weeks = Math.ceil(totalDays / 7);
    const calendar = [];

    const prevMonthEndDate = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();

    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const dayIndex = i * 7 + j;
        if (dayIndex >= startingDayOfWeek && dayIndex < totalDays) {
          const date = dayIndex - startingDayOfWeek + 1;
          const currentDate = new Date(
            startDateOfMonth.getFullYear(),
            startDateOfMonth.getMonth(),
            date
          );
          week.push(renderDate(currentDate, true));
        } else {
          if (dayIndex < startingDayOfWeek) {
            const prevMonthDate =
              prevMonthEndDate - (startingDayOfWeek - dayIndex) + 1;
            week.push(
              renderDate(
                new Date(currentYear, currentMonth - 2, prevMonthDate),
                false
              )
            );
          } else {
            const nextMonthDate = dayIndex - totalDays + 1;
            week.push(
              renderDate(
                new Date(currentYear, currentMonth, nextMonthDate),
                false
              )
            );
          }
        }
      }
      calendar.push(
        <div className={styles.week} key={`week-${i}`}>
          {week.map((day, index) => (
            <div key={`day-${i}-${index}`} className={styles.dateContainer}>
              {day}
            </div>
          ))}
        </div>
      );
    }

    return <div className={styles.calendar}>{calendar}</div>;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div
      className={styles.datePicker}
      ref={datePickerRef}
      data-testid='datePicker'>
      <input
        type='text'
        placeholder='請選擇時間區間'
        onFocus={() => setShowCalendar(!showCalendar)}
        value={
          startDate && endDate
            ? `${formatDate(startDate)}  -  ${formatDate(endDate)}`
            : ""
        }
        readOnly
      />
      <IoCalendarClearOutline className={styles.calendarIcon} />
      <TiDelete
        data-testid='deleteIcon'
        className={`${styles.calendarIcon} ${styles.delete}`}
        onClick={handleDeleteDates}
      />
      {showCalendar && (
        <div
          className={styles.calendarContainer}
          data-testid='calendarContainer'>
          <div className={styles.monthNavigation}>
            <button
              onClick={prevMonth}
              disabled={!isDatesCrossMonth}
              data-testid='prevBtn'>
              <MdOutlineNavigateBefore />
            </button>
            <div>
              {currentMonth === 0
                ? `${currentYear - 1}年12月`
                : `${currentYear}年${currentMonth}月`}
            </div>
            <button
              onClick={nextMonth}
              disabled={!isDatesCrossMonth}
              data-testid='nextBtn'>
              <MdNavigateNext />
            </button>
          </div>
          <div className={styles.daysOfWeek}>
            {days.map((day, index) => (
              <div className={styles.dayOfWeek} key={index}>
                {day}
              </div>
            ))}
          </div>
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
