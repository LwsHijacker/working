// UpdatePasswordProp 修改密码
interface UpdatePasswordProp {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// UpdateBaseInfoProp 修改基础信息
interface UpdateBaseInfoProp {
    phone: string;
    email: string;
}

export type {
    UpdatePasswordProp,
    UpdateBaseInfoProp
}