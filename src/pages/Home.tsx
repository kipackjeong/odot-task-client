import homeStyle from "./Home.module.css";
import AppContextProvider from "context/app-context.provider";
import TodoBoard from "components/TodoBoard/TodoBoard";

const Home = () => {
    return (

        <AppContextProvider>

            <div className={homeStyle.Home}>

                <TodoBoard />
                <a style={{ color: 'black' }} href="https://www.flaticon.com/free-icons/tick" title="tick icons">
                    Tick icons created by Alfredo Hernandez - Flaticon
                </a>

            </div>

        </AppContextProvider>
    )
}

export default Home;