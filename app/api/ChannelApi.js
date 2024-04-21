
import {apiClient} from './ApiClient';

export const createChannel = (values, serverId ,token) => {
    const payload = {
        name: values.name,
        type : values.type,
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.post(`/api/channel?serverId=${serverId}`, payload, {headers});
}

export const deleteChannel = (channelId, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.delete(`/api/channel/${channelId}`,{headers: headers})
}
export const updateChannel = async (values, serverId, token) => {
    const payload = {
        name: values.name,
        type: values.type
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    console.log(payload);
    return apiClient.patch(`/api/server/${serverId}`, payload,{ headers: headers });
}