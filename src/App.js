import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";


function App() {
  return (
    <div className="">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
    </div>
  );
}

export default App;
