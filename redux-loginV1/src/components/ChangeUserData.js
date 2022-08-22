import React, { useState } from "react";
import { useStore, useSelect, useDispatch, useSelector } from "react-redux";

const ChangeUserData = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const store = useStore();

    const dispatch = useDispatch()

    const currentName = useSelector(state => state.username)

    const handleInput = ev => {
        const field = ev.target.name;

        switch (field) {
            case "username":
                setUsername(ev.target.value)
                break;
            case "password":
                setPassword(ev.target.value)
                break;
            case "passwordRepeat":
                setPasswordRepeat(ev.target.value)
                break;

            default:
                break;
        }
    }

    const handleChange = (ev) => {
        ev.preventDefault();

        dispatch({
            type: 'CHANGE_USER_DATA',
            username,
            password,
            passwordRepeat
        })
    }


    return <form>
        <div>
            <label htmlFor="username">New Username: </label>
            <input type="text" name="username" defaultValue={currentName} onChange={handleInput} />
        </div>
        <div>
            <label htmlFor="password">New Password: </label>
            <input type="password" name="password" onChange={handleInput} />
        </div>
        <div>
            <label htmlFor="passwordRepeat">Repeat new Password: </label>
            <input type="password" name="passwordRepeat" onChange={handleInput} />
        </div>
        <button onClick={handleChange}>Save</button>
    </form>
}

export default ChangeUserData