import axios from 'axios';

const getJwtToken = () => {
    return JSON.parse(localStorage.getItem('id_token'));
}

class HttpService {

    axiosInstance;


    constructor() {
        console.log('ENV: ', process.env)
        this.axiosInstance = axios.create({
            baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`
        })




        // this.axiosInstance.defaults.headers.common['x-auth-token'] = this.getJwtToken().token;

        this.axiosInstance.interceptors.request.use(function (config) {
            // Do something before request is sent
            config.headers.common['x-auth-token'] = getJwtToken().token;
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
        
        
        // Adding a response interceptor to handle errors in a common way
        this.axiosInstance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }


    // common GET method
    get = (url, params = {}) => {
        console.log('in my own get')
        return this.axiosInstance.get(url, params);
    }

    // common POST method
    post = (url, body) => {
        return this.axiosInstance.post(url, body);
    }

    // common DELETE method
    delete = (url, body) => {
        return this.axiosInstance.delete(url, body);
    }


}


export default new HttpService();