import {https} from "@/utils/request.ts";

export const meetingPage = (data: any): Promise<any> => {
    debugger
    return https.request({
        url: '/meeting/page',
        method: 'post',
        data: data
    })
}

export const meetingSave = (data: any): Promise<boolean> => {
    return https.request({
        url: '/meeting/save',
        method: 'post',
        data: data
    })
}

export const meetingSaveHelpInfo = (data: any): Promise<boolean> => {
    return https.request({
        url: '/meeting/help',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const meetingDeleteById = (data: any): Promise<boolean> => {
    debugger
    return https.request({
        url: '/meeting/delete',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const meetingQueryById = (data: any): Promise<any> => {
    return https.request({
        url: '/meeting/info',
        method: 'get',
        params: data
    })
}