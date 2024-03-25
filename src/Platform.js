import { Routes, Route } from "react-router-dom";
import DateRange from "./dateRange";

const Platform = () => {
  return (
    <Routes>
      <Route path='' element={<DateRange />} />
    </Routes>
  );
};

export default Platform;
