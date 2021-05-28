import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Doc from './pages/ckeditor'

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/aplikasi/add">
            <Add/>
          </Route>
          <Route path="/aplikasi/doc">
            <Doc/>
          </Route>
          <Route path="/aplikasi/:id">
            <Edit/>
          </Route>
          <Route path="/aplikasi">
            <Home/>
          </Route>
          <Route path="/">
            <Redirect to="/aplikasi"/>
          </Route>
        </Switch>
    </Router>
  );
}