import { apiClient } from './ApiClient';

export const createServer = (values, token) => {
    const payload = {
        imageUrl: values.imageUrl,
        name: values.name

    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    console.log(payload);
    return apiClient.post(`/api/server`, payload,{ headers: headers });
};
