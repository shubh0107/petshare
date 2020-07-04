import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

const Login = props => {

    let history = useHistory();


    const redirectToHome = () => history.push('/home');

    const responseFacebook = function (response) {
        console.log('response: ', response);
        if (!response.error) {
            axios.post(`http://localhost:8000/users/auth/facebook`, { access_token: response.accessToken }).then(response => {
                console.log('response from backend server: ', response);
                const token = response.data;
                if (token) {
                    localStorage.setItem('id_token', JSON.stringify({
                        token
                    }));
                    redirectToHome();
                }
            }).catch(error => {
                console.log('Error while calling api: ', error);
            })
        } else {
            console.log('Error while loggin in : ', response.error);
        }
    }

    const componentClicked = (data) => {
        console.log('component was clicked: ', data);
    }


    return (
        <FacebookLogin
            appId="175592370512691"
            autoLoad={false}
            fields="name,picture,email"
            onClick={componentClicked}
            callback={responseFacebook}
        />
    )
}

export default Login;