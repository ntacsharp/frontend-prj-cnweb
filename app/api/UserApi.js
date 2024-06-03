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
         if(error.response.data.message === "Only admin can access"){
            window.location.href = '/error/admin';
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

export const adminGetAll = async(token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return apiClient.get(`/api/admin/all`,{headers:headers});
}


export const createUser = (username, email, password, displayname, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const payload = {
        username: username,
        email: email,
        password: password,
        displayName: displayname
    };

    return apiClient.post(`/api/admin/create`, payload, {headers : headers});
};


export const updateUser = (id,username, password, displayname, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const payload = {
        username: username,
        password: password,
        displayName: displayname
    };

    return apiClient.put(`/api/admin/update/${id}`, payload, {headers : headers});
};

export const deleteUser = (id, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return apiClient.delete(`/api/admin/delete/${id}`, {headers : headers});
}


export const searchUser = (query, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return apiClient.get(`/api/admin/search?query=${query}`, {headers : headers});

}