import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';

import { withRouter } from "react-router-dom";


function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event)  => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // 이 역할은 페이지가 refresh되는 것을 막아줌
        // 해당 페이지에서 refresh가 되면 그 페이지에서 해야하는 일들을 수행하지 못한다.
        event.preventDefault();

        console.log('Email', Email)
        console.log('Password', Password)

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    // React에서는 페이지이동을 다음과 같이 한다.
                    props.history.push('/')
                } else {
                    alert('Error, Login False')
                }
            })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

            <form style={{
                display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br/>
                <button>
                    Login
                </button>

            </form>

        </div>
    );
}

export default withRouter(LoginPage);