import axios from 'axios'

const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        'Content-Type' : 'application/json',
    }
})

const logIn = async (payload) =>{
    try{
     let response = await apiClient.post('/auth/log-in', payload)
     return response
    }
    catch(err){
        return err.response
    }
}

const signUp = async (payload) =>{
    try{
     let response = await apiClient.post('/auth/sign-up', payload)
     return response
    }
    catch(err){
        return err.response
    }
}

const fetchData = async (endpoint) =>{
    try{
        let response = await apiClient.get(endpoint, {
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            }

        })
        return response
    }
    catch(err){
        return err.response
    }
}

const postData = async (endpoint, body) =>{
    try{
        let response = await apiClient.post(endpoint, body, {
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            }
        })
        return await response
    }
    catch(err){
        return err.response
    }
}

const putData = async (endpoint, body) =>{
    try{
        let resposnse = await apiClient.put(endpoint, body, {
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            }
        })
        return resposnse
    }
    catch(err){
        return err.response
    }
}

const deleteData = async (endpoint) =>{
    try{
        let response = await apiClient.delete(endpoint, {
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            }
        })
        return response
    }
    catch(err){
        return err.response
    }
}

export { logIn, signUp, fetchData, postData, putData, deleteData }