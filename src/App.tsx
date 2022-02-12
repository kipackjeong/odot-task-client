import appStyle from "./App.module.css";
import AppContextProvider from "context/app-context.provider";
import TodoBoard from "components/TodoBoard/TodoBoard";

function App() {
  return (
    <AppContextProvider>

      <div className={appStyle.App}>

        <TodoBoard />
        <a style={{ color: 'black' }} href="https://www.flaticon.com/free-icons/tick" title="tick icons">
          Tick icons created by Alfredo Hernandez - Flaticon
        </a>

      </div>

    </AppContextProvider>
  );
}

export default App;
