import {apiClient} from './ApiClient';

export const getOrCreateConversation = async (memberOneId, memberTwoId,token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

   const response = await apiClient.get(`api/conversation?memberOneId=${memberOneId}&memberTwoId=${memberTwoId}`,{headers: headers})

   return response.data
}