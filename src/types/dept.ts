namespace Dept {
    // 用户部门信息
    export interface UserDeptProp {
        deptId: number;  // 岗位ID
        parentId: number; // 上次岗位
        deptName: string; // 岗位名称
        deptPath: string; // 岗位路径
    }

    // DeptTableQueryProp 部门表格查询
    export interface DeptTableQueryProp {
        name?: string; // 部门名称
        status?: number; // 部门状态
    }

    // MenuTableTreeProp 部门表格树属性
    export interface DeptTableTreeProp {
        key: number;                     // 主键
        title: string;                   // 部门名称
        order: number;                   // 排序
        status: number;                  // 状态
        createTime: string;              // 创建时间
        children: DeptTableTreeProp[];   // 下级部门
    }

    // DrawerProp 抽屉参数
    export interface DeptDrawerProp {
        currId?: number;
        parentId?: number;
        createVisible: boolean;
        updateVisible: boolean;
    }
}

export default Dept;
