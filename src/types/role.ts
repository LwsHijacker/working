import {RolePageProp} from "@/pages/system/role/modules.ts";

namespace Role {
    // 用户角色信息
    export interface UserRoleProp {
        roleId: number;    // 角色ID
        roleName: string;  // 角色名称
        roleCode: string;  // 角色编码
    }

    // RoleDataPermProp 角色数据权限组件属性
    export interface RoleDataPermProp {
        roleProp: RolePageProp;
        visible: boolean;
        close: (isLoad: boolean) => void;
    }

    // DataPermFormProp 数据权限表单属性
    export interface DataPermFormProp {
        roleId: number; // 角色Id
        roleName: string; // 角色名称
        roleCode: string; // 角色编码
        dataType: number; // 数据权限范围
        dataValue?: number[]; // 对应范围值
    }
}

export default Role;
