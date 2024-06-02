
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

export const deleteChannel = (serverId,channelId, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.delete(`/api/channel/${channelId}?serverId=${serverId}`,{headers: headers})
}
export const updateChannel = async (values,channelId ,serverId, token) => {
    const payload = {
        name: values.name,
        type: values.type
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.put(`/api/channel/${channelId}?serverId=${serverId}`, payload,{ headers: headers });
}
export const getChannelById = async (channelId, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.get(`/api/channel/${channelId}`, { headers: headers });
}