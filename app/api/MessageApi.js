import { apiClient } from './ApiClient';

export const sendMessage = async (token, url, value) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const payload = {
        value: value.content
    }
    console.log(url);
    const data = await apiClient.post(url, payload, { headers: headers });
    return data.data
}

export const editMessage = async (token, url, value) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const payload = {
        value: value.content
    }
    const data = await apiClient.patch(url, payload, { headers: headers });
    return data.data
}