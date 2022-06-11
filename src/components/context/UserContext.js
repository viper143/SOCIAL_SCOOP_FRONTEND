import { useState, createContext, useEffect } from 'react';

import axios from 'axios';



export const UserContext = createContext();



export const UserProvider = (props) => {

    const [user, setUser] = useState();



    useEffect(() => {

        const parseJwt = (token) => {

            if (!token) { return; }
        
            const base64Url = token.split('.')[1];
        
            const base64 = base64Url.replace('-', '+').replace('_', '/');
        
            return JSON.parse(window.atob(base64));
        
        }

        const token = localStorage.getItem('token');

        const parseToken = parseJwt(token);

        axios.get(`/profile/${parseToken?.cusId}`).then(function (result) {
            // console.log(token)
            // console.log(result.data.profile)
            setUser(result.data.profile)

            // console.log(parseToken);

        })

    }, [])



    return (

        <UserContext.Provider value={[user, setUser]}>

            {props.children}

        </UserContext.Provider>

    )

}