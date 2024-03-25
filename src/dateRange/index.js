import React from "react";
import styles from "./style/dateRange.module.scss";
import DatePicker from "../Utility/DatePicker";

const DateRange = () => {
  return (
    <div className={styles.dateRangecontainer}>
      <div>
        <h4>Current Month Only</h4>
        <DatePicker isDatesCrossMonth={false} />
      </div>
      <div>
        <h4>Cross Months</h4>
        <DatePicker isDatesCrossMonth={true} />
      </div>
    </div>
  );
};

export default DateRange;
