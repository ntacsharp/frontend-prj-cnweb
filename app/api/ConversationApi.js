import apiClient from './ApiClient';

export const getOrCreateConversation = async (memberOneId, memberTwoId) => {
   const data = await apiClient.get(`http://localhost:4869/conversation?memberOneId=${memberOneId}&memberTwoId=/${memberTwoId}`)
   return data.data
}