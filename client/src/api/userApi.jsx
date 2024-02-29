import axios from 'axios'

export const loginApi=(data)=>axios.post('http://localhost:8800/api/user/login',data)
export const getAllTimeline=()=>axios.get('http://localhost:8800/api/post/timelines/all')