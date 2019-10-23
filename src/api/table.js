import request from '@/util/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
