import { https } from "@/utils/request.ts";

// 通过子会议Id获取子会议信息
export const submeetingQueryById = (data: any): Promise<any> => {
    return https.request({
        url: '/subMeeting/info',
        method: 'get',
        params: data
    })
}

// 通过主会议Id查询所有子会议
export const submeetingQueryByMainId = (data: any): Promise<any> => {
    return https.request({
        url: '/submeeting/infoByMainId',
        method: 'get',
        params: data
    })
}

// 创建子会议
export const submeetingCreate = (data: any): Promise<boolean> => {
    return https.request({
        url: '/submeeting/create',
        method: 'post',
        data: data
    })
}

export const submeetingUpdate = (data: any): Promise<boolean> => {
    return https.request({
        url: '/submeeting/update',
        method: 'post',
        data: data
    })
}

// 删除子会议
export const submeetingDelete = (data: any): Promise<boolean> => {
    return https.request({
        url: '/submeeting/delete',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

export const submeetingSaveHelpInfo = (data: any): Promise<boolean> => {
    return https.request({
        url: '/submeeting/help',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

export const submeetingPage = (data: any): Promise<any> => {
    return https.request({
        url: '/submeeting/page',
        method: 'post',
        data: data
    })
}

export const submeetingPageByMainId = (data: any): Promise<any> => {
    return https.request({
        url: '/submeeting/pageByMainId',
        method: 'post',
        data: data
    })
}

export const submeetingSave = (data: any): Promise<boolean> => {
    console.log(data)
    return https.request({
        url: '/submeeting/save',
        method: 'post',
        data: data
    })
}