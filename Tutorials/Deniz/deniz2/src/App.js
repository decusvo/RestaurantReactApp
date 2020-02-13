import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import allActions from "./actions";


class App extends React.Component{
    counter = useSelector(state => state.counter);
    currentUser = useSelector(state => state.currentUser);

    dispatch = useDispatch();
    user = {name: "Deniz"};

    constructor(props) {
        super(props);
        useEffect(() => {
            this.dispatch(allActions.userActions.setUser(this.user))
        }, []);
    }
  render() {
    return(
        <div className="App">
            {this.currentUser.loggedIn ?
            <>
            <h1>Hello, {this.currentUser.user.name}</h1>
            <button onClick={() => this.dispatch(allActions.userActions.logOut())}>Logout</button>
            </>
            :
            <>
            <h1>Login</h1>
            <button onClick={() => this.dispatch(allActions.userActions.setUser(this.user))}>Login as Deniz</button>
            </>
            }
            <h1>Counter: {this.counter}</h1>
            <button onClick={() => this.dispatch(allActions.counterActions.increment())}>Increase Counter</button>
            <button onClick={() => this.dispatch(allActions.counterActions.decrement())}>Decrease Counter</button>
        </div>
        )
  }
}

export default App;
