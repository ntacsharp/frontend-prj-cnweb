import { apiClient } from './ApiClient';

export const createProfile = async (name, token) => {
    const payload = {
        name: name,
        imageUrl: "https://utfs.io/f/f80a95aa-c01a-4049-9563-baf30e9b1ad2-ar4agn.png"
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return apiClient.post(`/api/profile`, payload,{ headers: headers });
}

export const getProfileById = async (token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.get(`/api/profile`, { headers: headers });
}
