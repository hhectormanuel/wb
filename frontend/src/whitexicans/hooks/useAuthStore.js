import { useContext } from "react"
import { AuthContext } from "../../auth/context/AuthContext"
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const useAuthStore = () => {

    const { logout, checkingAuth, login } = useContext(AuthContext);

    const refreshUrl = 'http://127.0.0.1:8000/api/token/refresh/';

    const checkAuthToken = async() => {
        checkingAuth();
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh');
        if(!token) return logout();
        try {
            const resp = await axios.post(refreshUrl,{ refresh: refresh });
            let access = resp.data.access;
            const decoded = jwt_decode(token);
            let username = decoded.username;
            let user_id = decoded.user_id;
            localStorage.setItem('token', resp.data.access);
            localStorage.setItem('token-init-date', decoded.exp);
            localStorage.setItem('refresh', resp.data.refresh)
            login(access, username, user_id );
        } catch (error) {
            console.log(error)
            localStorage.removeItem('refresh');
            logout();
        }
    }

    return {
        checkAuthToken
    }
}

// const resp = await axios.post(loginUrl, {username, password})