
import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./profile/Profile";
import Chat from './chat/Chat';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';



function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route exact path="/profile" render={(props) => <Profile {...props} />} />
          <Route exact path="/chat" render={(props) => <Chat {...props} />} />
          <Route exact path="/sign-in" render={(props) => <SignIn {...props} />} />
          <Route exact path="/sign-up" render={(props) => <SignUp {...props} />} />

          
          
          
          
          {/* <Route
            exact
            path="/login"
            render={(props) => <Signin {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route exact path="/chat" render={(props) => <Chat {...props} />} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
