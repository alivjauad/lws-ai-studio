import AppLayout from "./components/layout/AppLayout";
import AppContextProvider from "./context/AppContext";

const App = () => {
  return (
    <AppContextProvider>
      <AppLayout />
    </AppContextProvider>
  );
};

export default App;
