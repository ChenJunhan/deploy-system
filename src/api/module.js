import request from '@/utils/request'

export function getModulesList(data) {
  return request({
    url: '/modules/getModulesList',
    method: 'post',
    data
  })
}