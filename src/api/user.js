import http from '@/util/http'

export function login(data) {
  return http.post('/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/login',data)
}

export function getInfo(token) {
  return http.get('/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/userInfo',{
    params: { token }
  })
}

export function logout() {
  return http.post('/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/logout')
}
