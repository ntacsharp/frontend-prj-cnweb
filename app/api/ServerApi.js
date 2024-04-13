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

export const listAllServers = (token) =>{
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.get(`/api/server/all`,{headers: headers});
}

export const getServerById =(id,token) =>{
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.get(`/api/server/${id}`,{headers: headers})
}

export const generateNewLink = async (id, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.get(`/api/server/${id}/invite`,{headers: headers});
}

export const joinServer = async (inviteCode, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.patch(`/api/server/join/${inviteCode}`,{headers: headers});
}