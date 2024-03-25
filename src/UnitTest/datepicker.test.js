import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import DatePicker from "../Utility/DatePicker";

// TEST 1
test("check component shoud actually render", () => {
  render(<DatePicker isDatesCrossMonth={false} />);
  const datePickerElement = screen.getByTestId("datePicker");
  expect(datePickerElement).toBeInTheDocument;
});

// TEST 2
test("while click input && showCalendar = true , check calendarContainer shows", () => {
  act(() => {
    render(<DatePicker isDatesCrossMonth={false} />);
  });

  act(() => {
    userEvent.click(screen.getByPlaceholderText("請選擇時間區間"));
  });

  const calendarContainer = screen.queryByTestId("calendarContainer");

  expect(calendarContainer).toBeInTheDocument();
});

// TEST 3
test("test click delete icon to delete both start&end date", () => {
  act(() => {
    render(<DatePicker isDatesCrossMonth={false} />);
  });
  act(() => {
    userEvent.click(screen.getByTestId("deleteIcon"));
  });
  expect(screen.getByPlaceholderText("請選擇時間區間").value).toBe("");
});

// TEST 4
test("test click prev & next month button , if prop.isDatesCrossMonth === false prev & next month button shoud be disabled ; else cross month", () => {
  act(() => {
    render(<DatePicker isDatesCrossMonth={false} />);
  });

  act(() => {
    userEvent.click(screen.getByPlaceholderText("請選擇時間區間"));
  });

  const prevMonthBtn = screen.getByTestId("prevBtn");
  const nextMonthBtn = screen.getByTestId("nextBtn");

  act(() => {
    userEvent.click(prevMonthBtn);
    userEvent.click(nextMonthBtn);
    expect(prevMonthBtn).toBeDisabled();
    expect(nextMonthBtn).toBeDisabled();
  });
});
