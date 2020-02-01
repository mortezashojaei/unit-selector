import {get,post,put} from './API';

export function login(data) {
    return post('user/login',data)
}

export function signup(data,type) {
    if(type=='put'){
        delete data['password']
        return put('users',data)
    }
    return post('users',data)
}
export function info() { 
    return get('user',null)
 }