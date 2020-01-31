import {get,post,put} from './API';

export function login(data) {
    return post('user/login',data)
}

export function signup(data,type) {
    if(type=='post')
    return post('users',data)
    return put('users',data)
}
export function info() { 
    return get('user',null)
 }