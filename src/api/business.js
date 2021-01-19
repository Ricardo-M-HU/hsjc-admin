import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 获取采集点列表
export function collectionList(query) {
  return request({
    url: '/basic/collectAddr/list',
    method: 'get',
    params: query
  })
}

//获取社区列表
export function communityList(query) {
  return request({
    url: '/basic/community/list',
    method: 'get',
    params: query
  })
}

//获取送检机构列表
export function insOrg(query) {
  return request({
    url: '/basic/inspectOrg/list',
    method: 'get',
    params: query
  })
}

// 新增采集登记
export function addCollection(data) {
  return request({
    url: '/basic/residentRegist/add',
    method: 'post',
    data: data
  })
}

//获取采集信息
export function getCollectionList(data) {
  return request({
    url: '/basic/residentRegist/list',
    method: 'get',
    params: data
  })
}

//
// 查询用户详细
export function getInfoByBarCode(barCode) {
  return request({
    url: '/basic/residentRegist/getInfoByBarCode/' + praseStrEmpty(barCode),
    method: 'get'
  })
}

//送检
export function sj(data) {
  return request({
    url: '/basic/inspectRecord/add',
    method: 'post',
    data: data
  })
}


//获取送检信息
export function getInspections(data) {
  return request({
    url: '/basic/inspectRecord/list',
    method: 'get',
    params: data
  })
}


