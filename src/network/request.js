import axios from 'axios';

export function request(config){
  const instance = axios.create({
    baseURL:'https://elm.cangdu.org',
    timeout:5000
  })

  return instance(config)
}

