import { useEffect } from "react";
import RoutesWrapper from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { changeMyUser } from "store/myuser";
import api from "services/api";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));
  // const isAuthenticated = true;


  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/");
    } else {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated])

  return <RoutesWrapper />;
}

export default App;
