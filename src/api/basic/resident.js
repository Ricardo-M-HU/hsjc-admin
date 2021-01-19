import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询列表
export function listResident(query) {
  return request({
    url: '/basic/resident/list',
    method: 'get',
    params: query
  })
}

export function exportResident(query) {
  return request({
    url: '/basic/resident/export',
    method: 'get',
    params: query
  })
}

