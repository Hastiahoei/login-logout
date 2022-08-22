import React, { useState } from "react";
import {useDispatch} from "react-redux";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const handleInput = ev => {
        const field = ev.target.name;

        switch (field) {
            case "username":
                setUsername(ev.target.value)
                break;
            case "password":
                setPassword(ev.target.value)
                break;

            default:
                break;
        }
    }

    const handleLogin = ev => {
        ev.preventDefault();

        dispatch({
            type: 'LOGIN',
            username,
            password
        })
    }


    return <form>
        <div>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" onChange={handleInput} />
        </div>
        <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" onChange={handleInput} />
        </div>
        <button onClick={handleLogin}>Login</button>
    </form>
}

export default Login