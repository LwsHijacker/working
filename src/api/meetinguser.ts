import {https} from "@/utils/request.ts";

export const meetingUserPage = (data: any): Promise<any> => {
    return https.request({
        url: '/meetinguser/page',
        method: 'post',
        data: data
    })
}

export const meetingMakeInvoicePageQuery = (data: any): Promise<any> => {

    return https.request({
        url: '/userinvoice/pageFind',
        method: 'post',
        data: data
    })
}

export const meetingMakeInvoiceUserExport = (data: any): any => {
    return https.request({
        url: '/userinvoice/export',
        method: 'post',
        data: data,
        responseType: 'blob',

    }, {
        isTransformResponse: false
    })
}

export const meetingUserSave = (data: any): Promise<any> => {
    return https.request({
        url: '/meetinguser/save',
        method: 'post',
        data: data
    })
}

export const meetingUserInvoiceSave = (data: any): Promise<any> => {
    return https.request({
        url: '/userinvoice/save',
        method: 'post',
        data: data
    })
}


export const meetingUserQueryStatus = (data: any): Promise<any> => {
    return https.request({
        url: '/meetinguser/status',
        method: 'get',
        params: data
    })
}

export const meetingUserLogin = (data: any): Promise<any> => {
    return https.request({
        url: '/meetinguser/login',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const checkUserStatus = (data: any): Promise<any> => {
    debugger
    return https.request({
        url: '/meetinguser/check',
        method: "get",
        params: data
    })
}

export const updateUserStatus = (data: any): Promise<any> => {
    debugger
    return https.request({
        url: '/meetinguser/updateUserStatus',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const meetingUserDeleteById = (data: any): Promise<any> => {
    return https.request({
        url: '/meetinguser/delete',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const meetingUserSign = (data: any): Promise<any> => {
    return https.request({
        url: '/meetinguser/sign',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const meetingUserQueryById = (data: any): Promise<any> => {
    return https.request({
        url: '/meetinguser/info',
        method: 'get',
        params: data
    })
}
