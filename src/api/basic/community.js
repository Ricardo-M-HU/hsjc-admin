import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询社区列表
export function listCommunity(query) {
  return request({
    url: '/basic/community/list',
    method: 'get',
    params: query
  })
}
//delCommunity
export function delCommunity(ids) {
  return request({
    url: '/basic/community/' + ids,
    method: 'delete'
  })
}

export function updateCommunity(data) {
  return request({
    url: '/basic/community/',
    method: 'put',
    data: data
  })
}

export function addCommunity(data) {
  return request({
    url: '/basic/community/',
    method: 'post',
    data: data
  })
}

export function exportCommunity(query) {
  return request({
    url: '/basic/community/export',
    method: 'get',
    params: query
  })
}



export function getCommunity(id) {
  return request({
    url: '/basic/community/' + id,
    method: 'get'
  })
}
