import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询列表
export function listResidentRegist(query) {
  return request({
    url: '/basic/residentRegist/list',
    method: 'get',
    params: query
  })
}

export function exportResidentRegist(query) {
  return request({
    url: '/basic/residentRegist/export',
    method: 'get',
    params: query
  })
}
