import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Home from "./pages/Home";


function App() {
  return (
    <div className="">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/table" component={Table} />
          <Redirect from="*" to="/" />
        </Switch>
    </div>
  );
}

export default App;
