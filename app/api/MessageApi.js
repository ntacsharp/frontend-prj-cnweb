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