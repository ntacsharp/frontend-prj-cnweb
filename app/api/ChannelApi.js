
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
export const updateChannel = async (values,channelId ,serverId, token) => {
    const payload = {
        name: values.name,
        type: values.type
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    console.log(payload);
    return apiClient.put(`/api/channel/${channelId}?serverId=${serverId}`, payload,{ headers: headers });
}
export const getChannelById = async (channelId, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.get(`/api/channel/${channelId}`, { headers: headers });
}