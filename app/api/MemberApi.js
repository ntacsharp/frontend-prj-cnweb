import { apiClient } from './ApiClient';

export const changeMemberRole = async (values, ids, token) => {
    const payload = {
        roles: values,
        serverId: ids.serverId
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.patch(`/api/member/${ids.memberId}`, payload, {headers: headers});
}

export const deleteMember = async (ids, token) => {
    const payload = {
        serverId: ids.serverId
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.delete(`/api/member/${ids.memberId}`, payload, {headers: headers});
}