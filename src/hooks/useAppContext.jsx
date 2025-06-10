import { useContext } from "react";
import { AppContext } from "../context/index";

const useAppContext = () => useContext(AppContext);

export default useAppContext;
