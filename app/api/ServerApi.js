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

export const leaveServer = (serverId,token) =>{
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.patch(`/api/server/${serverId}/leave`,{headers: headers})

}

export const deleteServer = (serverId, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.delete(`/api/server/${serverId}`,{headers: headers})
}
export const generateNewLink = async (id, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.patch(`/api/server/${id}/invite`,null,{headers});
}

export const joinServer = async (inviteCode, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.patch(`/api/server/join/${inviteCode}`,null,{headers: headers});
}

export const updateServer = async (values, serverId, token) => {
    const payload = {
        imageUrl: values.imageUrl,
        name: values.name

    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    console.log(payload);
    return apiClient.patch(`/api/server/${serverId}`, payload,{ headers: headers });
}