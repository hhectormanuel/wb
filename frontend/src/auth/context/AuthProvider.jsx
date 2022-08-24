import React, { useReducer, useState } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from './types';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const init = () => {
    return [{
        status: 'checking',
        id: '',
        username: '',
        refresh: '',
        access:'',
    }];
}

export const AuthProvider = ({ children }) => {

    const [user, dispatch] = useReducer(authReducer, [{}], init);
    const [error, setError] = useState();
    const [openModal, setOpenModal] = useState(false);
    let access = '';
    let refresh = '';
    let slug = '';

    const checkingAuth = () => {
        const user = {
            status: 'checking',
            id: null,
            username: null,
            refresh: null,
            access:null,
        };
        const action = {
            type: types.check,
            payload: user
        };
        dispatch(action);
    };

    const login = (access, username, user_id, slug, follows, posts) => {
        const user = {
            status: 'auth',
            id: user_id,
            username: username,
            access: access,
            slug: slug,
            follows: follows,
            posts: posts,
        };
        const action = {
            type: types.login,
            payload: user
        };
        dispatch(action);
    };

    const logout = () => {
        const user = {
            status: 'no-auth',
            id: null,
            username: null,
            refresh: null,
            access:null,
        };
        const action = {
            type: types.logout,
            payload: user
        };
        dispatch(action);
        localStorage.clear();
    };

    const onStartLogin = async(username, password) => {

        checkingAuth();
          try {
            const loginUrl = 'http://127.0.0.1:8000/api/token/';
            const resp = await axios.post(loginUrl, {username, password})
            refresh = resp.data.refresh;
            access = resp.data.access;
            const decoded = jwt_decode(access);
            slug = decoded.slug;
            const { user_id } = decoded;
            localStorage.setItem('token', access);
            localStorage.setItem('token-init-date', decoded.exp);
            localStorage.setItem('refresh', refresh);

            const profile = `http://127.0.0.1:8000/${slug}`;
            const respuesta = await fetch(profile);
            const data = await respuesta.json();
            const { follows, posts } = data;
            console.log(respuesta)
            login(access, username, user_id, slug, follows, posts);
          } catch (error) {
            logout();
            if(error.response?.data.detail === 'No active account found with the given credentials')
            setError('Los datos ingresados son incorrectos');
          }
        };

    const onStartRegister = async(username, password, firstName, lastName, email) => {
        checkingAuth();
        try {
            const registerUrl = 'http://localhost:8000/signup/';
            const resp = await axios({
                method: 'post',
                url: registerUrl,
                data: {
                    username: username, password: password, first_name: firstName, last_name: lastName, email: email
                }
            });
            onStartLogin(username, password)
        } catch (error) {
            logout();
            setError(error.response.data.username)
        }
    };
 
  return (
    <AuthContext.Provider value={{ onStartLogin, logout, checkingAuth, login, error: error, user: user, onStartRegister, setError, openModal: openModal, setOpenModal }}>
        { children }
    </AuthContext.Provider>
  )
}
