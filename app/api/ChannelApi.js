
import {apiClient} from './ApiClient';

export const createChannel = (values, serverId ,token) => {
    const payload = {
        name: values.name,
        type : values.type,
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.post(`/channel?serverId=${serverId}`, payload, {headers});
}