import axios from 'axios';
import { URL_API, URL_GEOSERVER } from './settings';


export function login(){
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;

    axios.post(URL_API + '/login/',
        {username:username,password:password}, {withCredentials: true})
        .then(function (response) {
        // handle success
                console.log(response);
                document.getElementById("form-login-message").innerHTML=response.data.message;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                document.getElementById("form-login-message").innerHTML=error.message;
            })
            .finally(function () {
                // always executed
                console.log('Finally')
        });
}


export function logout(){
    axios.post(URL_API + '/logout/',{})
        .then(function (response) {
        // handle success
                console.log(response);
                document.getElementById("form-login-message").innerHTML=response.data.message;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
                console.log('Finally')
        });
}