import {get,post} from './API';

export default function fetchMajors() {
    return get('majors')
}