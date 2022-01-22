import appStyle from "./App.module.css";
import AppContextProvider from "./context/app-context.provider";
import TodoBoard from "./components/TodoBoard/TodoBoard";

function App() {
  return (
    <AppContextProvider>
      <div className={appStyle.App}>
        <TodoBoard />

        {
          //TODO Make references component
        }
        <a href="https://www.flaticon.com/free-icons/tick" title="tick icons">
          Tick icons created by Alfredo Hernandez - Flaticon
        </a>
      </div>
    </AppContextProvider>
  );
}

export default App;
