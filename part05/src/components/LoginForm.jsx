import { useState, useImperativeHandle, forwardRef } from 'react'
import './LoginForm.css'

const LoginForm = forwardRef(({ handleLogin, username, setUsername, password, setPassword }, ref) => {

    return (
        <form onSubmit={handleLogin}>
            <div className="inputContainer">
                Username
                <br />
                <input
                    type="text"
                    value={username}
                    name="Username"
                    placeholder='User name'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div className="inputContainer">
                Password
                <br />
                <input
                    type="Password"
                    value={password}
                    name="Password"
                    placeholder='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button className='greenBtn' type="submit">Login</button>
        </form>
    )
})

export default LoginForm 