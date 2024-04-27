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

export const login = async (email,password, provider) => {
    const payload = {
        email: email,
        password: password,
        provider: provider
    };
    return apiClient.post(`/api/user/login`, payload);
}

    