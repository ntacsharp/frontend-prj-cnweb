import {apiClient} from './ApiClient';

export const getOrCreateConversation = async (memberOneId, memberTwoId,token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

   const data = await apiClient.get(`api/conversation?memberOneId=${memberOneId}&memberTwoId=/${memberTwoId}`,{headers: headers})

   return data.data
}