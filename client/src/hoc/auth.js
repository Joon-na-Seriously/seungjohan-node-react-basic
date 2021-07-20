import React, {useEffect} from 'react';
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_actions'
//import {response} from "express";

export default function (SpecificComponent, option, adminRoute = null) {

    // Auth가 Back-end로 Request를 날린다.
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            // action 이름 = auth()
            dispatch(auth()).then(response => {
                console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) { // => option === true
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option === false)
                            props.history.push('/')
                    }
                }
            });

            //Axios 를 써도 되지만 Redux를 쓰겠다.
            //Axios.get('/api/users/auth')
        }, [])

        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}