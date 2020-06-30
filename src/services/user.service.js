import httpService from './http.service'





export const getCurrentUser = () => {
    console.log('here ia m')
    return httpService.get(`/api/auth/me`);
}

