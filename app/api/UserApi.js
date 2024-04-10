import { apiClient } from './ApiClient'


export const signUp = (username, email, password, displayName) => {

    const payload = {
        username: username,
        email: email,
        password: password,
        displayName: displayName
    };

    return apiClient.post(`/api/user/register`, payload);
};

export const login =  (email,password) => {
    const payload = {
        email: email,
        password: password,
    };
    console.log(payload)
    return apiClient.post(`/api/user/login`, payload);
}

    