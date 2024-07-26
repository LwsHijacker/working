import {https} from "@/utils/request.ts";
import {Menus} from "@/types";

// menuTree 菜单树
export const menuTable = (data: Menus.MenuTableTreeQueryProp): Promise<Menus.MenuTableTreeProp[]> => {
    return https.request({
        url: '/menu/table',
        method: 'post',
        data: data
    })
}

// menuTree 菜单树
export const menuTree = (): Promise<Menus.MenuTreeProp[]> => {
    return https.request({
        url: '/menu/tree',
        method: 'get',
    })
}

// menuTree 菜单创建
export const menuCreate = (data: Menus.MenuCreateFormProp): Promise<string> => {
    return https.request({
        url: '/menu/create',
        method: 'post',
        data: data
    })
}

// menuTree 菜单修改
export const menuUpdate = (data: Menus.MenuUpdateFormProp): Promise<string> => {
    return https.request({
        url: '/menu/update',
        method: 'post',
        data: data
    })
}

// menuTree 菜单详情
export const menuInfo = (menuId: number): Promise<Menus.MenuUpdateFormProp> => {
    return https.request({
        url: '/menu/info',
        method: 'get',
        params: {menuId: menuId}
    })
}

// menuDelete 菜单删除
export const menuDelete = (menuId: number): Promise<string> => {
    return https.request({
        url: '/menu/delete',
        method: 'get',
        params: {menuId: menuId}
    })
}

// menuDelete 菜单删除
export const userPageRouter = (roleId?: number): Promise<Menus.UserRouterProp[]> => {
    return https.request({
        url: '/menu/router',
        method: 'get',
        params: {roleId: roleId}
    })
}

// menuDelete 菜单删除
export const getPermissions = (roleId?: number): Promise<Menus.MenuItemProp[]> => {
    return https.request({
        url: '/menu/router',
        method: 'get',
        params: {roleId: roleId}
    })
}
