import {get,post} from './API';

export function login(data) {
    return post('user/login',data)
}

export function signup(data) {
    return post('users',data)
}