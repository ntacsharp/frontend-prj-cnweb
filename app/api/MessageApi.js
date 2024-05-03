import {apiClient} from './ApiClient';

export const sendMessage = async (token, serverId, channelId, value) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const payload = {
        value: value.content
    }
    const data = await apiClient.post(`api/message?serverId=${serverId}&channelId=${channelId}`,payload, {headers: headers});

   return data.data
}