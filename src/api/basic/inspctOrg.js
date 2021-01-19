import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

export function listInspectOrg(query) {
  return request({
    url: '/basic/inspectOrg/list',
    method: 'get',
    params: query
  })
}

export function getInspectOrg(id) {
  return request({
    url: '/basic/inspectOrg/' + id,
    method: 'get'
  })
}

export function delCommunity(ids) {
  return request({
    url: '/basic/inspectOrg/' + ids,
    method: 'delete'
  })
}

export function updateInspectOrg(data) {
  return request({
    url: '/basic/inspectOrg/',
    method: 'put',
    data: data
  })
}

export function addInspectOrg(data) {
  return request({
    url: '/basic/inspectOrg/',
    method: 'post',
    data: data
  })
}

export function exportInspectOrg(query) {
  return request({
    url: '/basic/inspectOrg/export',
    method: 'get',
    params: query
  })
}
