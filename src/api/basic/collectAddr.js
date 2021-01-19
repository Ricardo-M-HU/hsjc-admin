import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

export function listCollectAddr(query) {
  return request({
    url: '/basic/collectAddr/list',
    method: 'get',
    params: query
  })
}

export function getCollectAddr(id) {
  return request({
    url: '/basic/collectAddr/' + id,
    method: 'get'
  })
}

export function delCollectAddr(ids) {
  return request({
    url: '/basic/collectAddr/' + ids,
    method: 'delete'
  })
}

export function updateCollectAddr(data) {
  return request({
    url: '/basic/collectAddr/',
    method: 'put',
    data: data
  })
}

export function addCollectAddr(data) {
  return request({
    url: '/basic/collectAddr/',
    method: 'post',
    data: data
  })
}


export function exportCollectAddr(query) {
  return request({
    url: '/basic/collectAddr/export',
    method: 'get',
    params: query
  })
}

