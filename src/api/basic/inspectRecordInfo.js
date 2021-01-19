import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询列表
export function listInspectRecord(query) {
  return request({
    url: '/basic/inspectRecord/list',
    method: 'get',
    params: query
  })
}

export function exportInspectRecord(query) {
  return request({
    url: '/basic/inspectRecord/export',
    method: 'get',
    params: query
  })
}
