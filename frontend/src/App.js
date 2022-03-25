import { Route, Routes } from "react-router";
import routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} exact />
        ))}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
