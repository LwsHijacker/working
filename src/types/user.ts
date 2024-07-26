import Post from "@/types/post.ts";
import Role from "@/types/role.ts";
import Dept from "@/types/dept.ts";
import Menu from "@/types/menu.ts";
import Menus from "@/types/menu.ts";
import {RuleObject} from "rc-field-form/lib/interface";

namespace User {

    // 用户模块弹窗类型
    export enum DrawerType {
        CREATE,
        UPDATE,
        ROLE,
        IMPORT,
        PWD,
        INFO
    }

    // UserDrawerProp 用户抽屉属性
    export interface UserDrawerProp {
        createVisible: boolean;
        updateVisible: boolean;
        roleVisible: boolean;
        importVisible: boolean;
        resetPwdVisible: boolean;
        infoVisible: boolean;
        userId?: number;
    }

    export const DefaultDrawer: UserDrawerProp = {createVisible: false, updateVisible: false, roleVisible: false, importVisible: false, resetPwdVisible: false, infoVisible:false, userId: undefined};
    export const CreateUserDrawer: UserDrawerProp = {createVisible: true, updateVisible: false, roleVisible: false, importVisible: false, resetPwdVisible: false, infoVisible:false};
    export const UpdateUserDrawer: UserDrawerProp = {createVisible: false, updateVisible: true, roleVisible: false, importVisible: false, resetPwdVisible: false, infoVisible:false};
    export const RoleUserDrawer: UserDrawerProp = {createVisible: false, updateVisible: false, roleVisible: true, importVisible: false, resetPwdVisible: false, infoVisible:false};
    export const ImportUserDrawer: UserDrawerProp = {createVisible: false, updateVisible: false, roleVisible: false, importVisible: true, resetPwdVisible: false, infoVisible:false};
    export const UserResetPwdDrawer: UserDrawerProp = {createVisible: false, updateVisible: false, roleVisible: false, importVisible: false, resetPwdVisible: true, infoVisible:false};
    export const UserInfoDrawer: UserDrawerProp = {createVisible: false, updateVisible: false, roleVisible: false, importVisible: false, resetPwdVisible: false, infoVisible:true};

    export interface UserStoreProp {
        tabViewKey: string;
        tabViews: Menus.TabViewProp[];
        loginProp?: UserLoginResponse;
        userProp?: UserInfoProp;
        setLoginProp: (data: UserLoginResponse) => void;
        setUserProp: (data: UserInfoProp) => void;
        userLoginFetch: (data: LoginFormProp) => Promise<void>;
        useInfoFetch: () => Promise<void>;
        addTabView: (data: Menus.TabViewProp) => void;
        removeTabView: (key: string, isNegation?: boolean) => void;
        setTabViewKey: (key: string) => void;
        closeTabViewAll: () => void;
    }

    // LoginFormProp 用户登录表单
    export interface LoginFormProp {
        username: string;
        password: string;
        captcha: string;
        uuid: string;
    }

    // 用户详情
    export interface UserInfoProp {
        isSuper: boolean;   // 是否admin
        avatar: string;   // 头像
        userId: number;   // 用户ID
        userName: string; // 用户名称
        sex: number;      // 性别
        phone: string;    // 手机号
        nickName: string; // 昵称
        email: string;    // 邮箱
        deptId: number;   // 部门ID
        dept: Dept.UserDeptProp;   // 部门信息
        roles: Role.UserRoleProp[];// 角色
        posts: Post.UserPostProp[];// 岗位
        operates: string[]; // 操作
    }

    // 用户权限信息
    export interface UserPermissionProp {
        menus: Menu.MenuItemProp[]; // 菜单数据
        buttons: string[];          // 按钮
        paths: string[];            // 路径

    }

    // UserLoginResponse 用户登录返回
    export interface UserLoginResponse {
        token: string;      // token信息
        expireTime: number; // 到期时间
    }

    export interface ImportUserDrawerProp {
        visible: boolean;
        close: (isLoad: boolean) => void;
    }

    // UserTableProp 用户表属性
    export interface UserTableProp {
        userId:     number; // 用户ID
        userName:   string; // 用户名称
        nickName:   string; // 昵称
        deptName:   string; // 部门名称
        phone:      string; // 手机号
        status:     number; // 状态
        createTime: string; // 创建时间
        isSuper?: boolean;
    }

    // 用户表格分页查询属性
    export interface UserPageQueryProp {
        page:      number;
        size:      number;
        deptId?:   number; // 部门
        status?:   number; // 用户状态
        name?:     string; // 用户名称/手机号
    }

    export const DefaultPageProp: UserPageQueryProp = {page: 1, size: 10, status: 0};


    // UserCreateDrawerProp 用户创建抽屉属性
    export interface UserCreateDrawerProp {
        visible: boolean;
        deptId?: number;
        close: (isLoad: boolean) => void;
    }

    // UserUpdateDrawerProp 用户更新抽屉属性
    export interface UserUpdateDrawerProp {
        userId?: number;
        visible: boolean;
        close: (isLoad: boolean) => void;
    }

    // UserPwdDrawerProp 用户密码重置抽屉属性
    export interface UserPwdDrawerProp {
        userId?: number;
        visible: boolean;
        close: () => void;
    }

    // UserPasswordProp 修改密码表单属性
    export interface UserPasswordProp {
        userId: number;
        password: string;
        isSendEmail: boolean;
    }

    // UserInfoDrawerProp 用户详情抽屉属性
    export interface UserInfoDrawerProp {
        userId?: number;
        visible: boolean;
        close: () => void;
    }

    // UserCreateFormProp 用户创建表单
    export interface UserCreateFormProp {
        userName: string;   // 用户名称
        nickName: string;   // 用户昵称
        password: string;   // 密码
        deptId:   number;   // 部门ID
        phone?:   string;   // 手机号
        email?:   string;   // 邮箱
        sex:      number;   // 性别
        status:   number;   // 状态
        postId?:  number[]; // 岗位
        roleId?:  number[]; // 角色
        remark?:  string;   // 备注
    }

    // UserUpdateFormProp 用户更新表单
    export interface UserUpdateFormProp {
        userName: string;   // 用户名称
        nickName: string;   // 用户昵称
        deptId:   number;   // 部门ID
        phone?:   string;   // 手机号
        email?:   string;   // 邮箱
        sex:      number;   // 性别
        status:   number;   // 状态
        postId?:  number[]; // 岗位
        roleId?:  number[]; // 角色
        remark?:  string;   // 备注
    }

    // UserRoleDrawerProp 角色
    export interface UserRoleDrawerProp {
        userId?: number;
        visible: boolean;
        close: () => void;
    }

    // UserInfoPropResponse 用户详情页
    export interface UserInfoPropResponse {
        userId: number;          // 用户ID
        userName: string;        // 用户名称
        nickName: string;        // 昵称
        deptName: string;        // 部门名称
        phone: string;           // 手机号
        status: string;          // 状态
        sex: string;             // 性别
        createTime: Date;        // 创建时间
        isSuper: boolean;        // 是否为超级用户
        posts: string[];         // 岗位
        roles: string[];         // 角色
        remark: string;          // 备注
    }

    // 验证手机号码
    export const validateMobile = (_: RuleObject, value: string, callback: (error?: string) => void) => {
        if (value !== "") {
            const phoneReg = /^1[3456789]\d{9}$/;
            if (!phoneReg.test(value)) {
                callback('手机号码格式不正确，请重新输入');
            }
        }
        callback();
    };

    // 验证邮箱
    export const validateEmail = (_: RuleObject, value: string, callback: (error?: string) => void) => {
        if (value !== "") {
            const mailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            if (!mailReg.test(value)) {
                // return Promise.reject('邮箱格式不正确，请重新输入');
                callback('邮箱格式不正确，请重新输入');
            }
        }
        callback();
    };
}

export default User
