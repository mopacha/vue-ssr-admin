import http from '@/util/http'

export function login(data) {
  return http.post('/user/login',data)
}

export function getInfo(token) {
  return http.get('/user/info',{
    params: { token }
  })
}

export function logout() {
  return http.post('/user/logout')
}
