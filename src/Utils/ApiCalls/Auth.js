import {get,post} from './API';

export default function login(data) {
    return post('user/login',data)
}