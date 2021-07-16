import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListNotes from "./components/ListNotes";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";
import "./styles/App.css";

/**
 * 
 * @returns Main component with the routes of the different pages of the application
 */
function App() {
  return (
    <main className="app">
      <Navigation />

      <Router>
        <Route path="/" component={ListNotes} exact />

        <Route path="/edit/:id" component={CreateNote} />

        <Route path="/create" component={CreateNote} />

        <Route path="/user" component={CreateUser} />
      </Router>
    </main>
  );
}

export default App;
