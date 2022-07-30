import axios from "axios";

///CHANGE API URL BEFORE PRODUCTION
export const API_URL = "http://localhost:3006";
export const TOKEN_NAME = "Queue_token";

///FOR GET INFO
export const doApiGet = async(_url) =>{
try{
let resp = await axios.get(_url, {
    headers:{
        "x-api-key":localStorage[TOKEN_NAME],
        "content-type":"application/json"
    }
})
return resp;
}
catch(err){
    throw err;
}
}

///For POST,PUT,DELETE
export const doApiMethod = async(_url,_method,_body = {}) =>{
    try{
        let resp = await axios({
            url:_url,
            method:_method,
            data:JSON.stringify(_body),
            headers:{
                "x-api-key":localStorage[TOKEN_NAME],
                'content-type':"application/json"
            }
        })
        return resp;
    }
    catch(err){
        throw err;
    }
}