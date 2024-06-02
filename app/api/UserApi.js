import { apiClient } from './ApiClient'

apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if(error.response.status === 403){
         if(error.response.data.message === "Only user can access"){
            window.location.href = '/login';
         }
         
      }
      return Promise.reject(error);
    }
  );

export const signUp = (username, email, password, displayName) => {

    const payload = {
        username: username,
        email: email,
        password: password,
        displayName: displayName
    };

    return apiClient.post(`/api/user/register`, payload);
};

export const login = async (email,password, provider) => {
    const payload = {
        email: email,
        password: password,
        provider: provider
    };
    return apiClient.post(`/api/user/login`, payload);
}

export const updateUserProfile = async(values,token) => {
    const payload = {
        name : values.displayName,
        imageUrl: values.avatarUrl
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.put(`/api/profile`, payload,{headers:headers});
}
   


export const changePassword = async(values,token) => {
    const payload = {
        oldPassword : values.currentPassword,
        newPassword: values.newPassword
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.put(`/api/user/change-password`, payload,{headers:headers});
}