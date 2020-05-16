import axios from 'axios';

var service =axios.create({
  baseURL:'/db',
  "content-type":"application/json",
})

service.interceptors.request.use(config=>{
  return config
})

service.interceptors.response.use(res=>{
  return res.data
})

export default service
