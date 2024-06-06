
import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./profile/Profile";
import Chat from './chat/Chat';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import Friends from './friends/Friends';
import AnotherPage from './anotherPage/AnotherPage';
import { RecoilRoot } from "recoil";



function App(props) {
  return (
    <div className="App">
      <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile" render={(props) => <Profile {...props} />} />
          <Route exact path="/chat" render={(props) => <Chat {...props} />} />
          <Route exact path="/sign-in" render={(props) => <SignIn {...props} />} />
          <Route exact path="/sign-up" render={(props) => <SignUp {...props} />} />
          <Route exact path="/" render={(props) => <SignIn {...props} />} />
          <Route exact path="/friends" render={(props) => <Friends {...props} />} />
          <Route exact  path="/profile/:id" render={(props) => <AnotherPage {...props} />} />
        </Switch>
      </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
