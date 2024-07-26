import React from "react";

namespace Menus {

    // MenuCreateFormProp 菜单创建表单属性
    export interface MenuCreateFormProp {
        parentId:  number;  // 上级菜单
        menuName:  string;  // 菜单名称
        menuType:  number;  // 菜单类型 (M目录 C菜单 F按钮)
        menuCode:  string;  // 菜单编码
        icon:      string;  // 图标
        orderNum:  number;  // 菜单排序
        menuPath:  string;  // 路由地址
        isShow:    number;  // 显示状态 1:显示 2:隐藏
        isPublic:  number;  // 显示状态 1:公开 2:私有
        remark:    string;  // 菜单备注
    }

    // MenuUpdateFormProp 菜单创建表单属性
    export interface MenuUpdateFormProp extends MenuCreateFormProp{
        menuId: number; // 菜单ID
        menuCode:  string;
    }


    export interface MenuTreeProp {
        key: number;
        title: string;
        children: MenuTreeProp[];
    }


    // MenuCreateDrawerProp 菜单创建抽屉属性
    export interface MenuCreateDrawerProp {
        visible: boolean;
        parentId: number;
        close: (isLoad: boolean) => void;
    }


    // 资源数据
    export interface MenuItemProp {
        id:        number;        // 菜单主键
        pId:       number;        // 上级菜单
        icon?:     string;        // 图标
        types:     string;        // 类型 M目录 C菜单 F按钮
        title:     string;        // 菜单名称
        perms:     string;        // 权限字符
        sort:      number;        // 显示顺序
        path?:     string;        // 路由地址
        component: string;        // 组件路由
        children?: MenuItemProp[] // 下级菜单
    }

    // MenuTitleProp 菜单对应的标题和路由
    export interface MenuTitleProp {
        title: string;
        path: string;
    }

    // TabViewProp 路由菜单栏属性
    export interface TabViewProp {
        key: string | number;
        title: string | React.ReactNode;
        closeIcon?: boolean | React.ReactNode
    }

    // MenuTableTreeProp 菜单表格树属性
    export interface MenuTableTreeProp {
        key: number;                     // 主键
        title: string;                   // 菜单名称
        menuCode: string;                // 权限字符
        icon: string;                    // 图标
        menuPath?: string;               // 路由
        parentId: number;                // 上级ID
        isPublic: number;                // 是否公共
        isShow: number;                  // 是否展示
        orderNum: number;                // 排序
        createTime: string;              // 创建时间
        remark: string;                  // 备注
        children: MenuTableTreeProp[];
    }

    // DrawerProp 抽屉参数
    export interface DrawerProp {
        types?: number;
        currId?: number;
        parentId?: number;
        createVisible: boolean;
        updateVisible: boolean;
    }

    // MenuTableTreeQueryProp 菜单表格查询
    export interface MenuTableTreeQueryProp {
        name?: string;
        status?: number;
    }

    // MenuCreateFormProp 菜单创建表单属性
    export interface MenuCreateFormProp {
        parentId:  number;  // 上级菜单
        menuType:  number;  // 菜单类型 (1目录 2菜单 3按钮)
        perms:     string;  // 权限字符
        icon:      string;  // 图标
        menuName:  string;  // 菜单名称
        menuSort:  number;  // 菜单排序
        path:      string;  // 路由地址
        isShow:    number; // 显示状态 1:是 2:不是
        isPublic:    number; // 显示状态 1:是 2:不是
    }

// MenuUpdateFormProp 菜单创建表单属性
    export interface MenuUpdateFormProp extends MenuCreateFormProp{
        menuId: number; // 菜单ID
    }

    // MenuTreeProp 菜单树属性
    export interface MenuTreeProp {
        key: number;
        title: string;
        children: MenuTreeProp[];
    }

    // UserRouterProp 用户路由
    export interface UserRouterProp {
        id: number;                 // 菜单主键
        pId: number;                // 上级菜单
        icon: string;               // 图标
        title: string;              // 菜单名称
        perms: string;              // 权限字符
        sort: number;               // 显示顺序
        path: string;               // 路由地址
        component: string;          // 组件路由
        isRoot: boolean;            //
        children: UserRouterProp[]; // 子路由
    }

    // MenuUpdateDrawerProp 菜单更新抽屉属性
    export interface MenuUpdateDrawerProp {
        visible: boolean;
        menuId?: number;
        close: (isLoad: boolean) => void;
    }
}

export default Menus
