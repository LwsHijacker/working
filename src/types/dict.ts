namespace DictTypes {

    // 字典数据抽屉属性
    export interface DictValueDrawerProp {
        dictName: string;
        visible: boolean;
        close: () => void;
    }

    // 字典数据属性
    export interface DictValueTableProp {
        dataId: number;     // id
        dataLabel: string;  // 字典标签
        dataValue: string;  // 字典键值
        dataSort: number;   // 排序
        remark: string;     // 备注
        status: number;     // 状态
        createTime: string; // 创建时间
    }

    // 字典值分页属性
    export interface DictValuePageProp {
        page: number;
        size: number;
        dictName?: string;
        status?: number;
    }


}

export default DictTypes;
