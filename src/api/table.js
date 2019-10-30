import http from '@/util/http'

export function getList(params) {
  return http.get('/table/list',{
    params
  })
}
