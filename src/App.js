import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import Platform from "./Platform";

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Platform />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
