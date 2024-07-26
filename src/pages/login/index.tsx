import React, {useEffect, useState} from "react";
import './index.less';
import {Button, Form, Input,} from "antd";
import {
    LockOutlined,
    SafetyOutlined,
    UserOutlined,
} from "@ant-design/icons";
import LoginBg from '@/assets/images/login-bg-1.svg';
import {useNavigate} from "react-router-dom";
import {captchaImage} from "@/api/user";
import {LoginCaptchaProp} from "@/pages/login/modules";
import {HOME_PAGE} from "@/constant/setting.ts";
import {User} from "@/types";
import useStore from "@/store/store.ts";


export interface LoginFormProp {
    username: string;
    password: string;
    captcha: string;
    uuid: string;
}

interface LoginProp {
    submit: (data: User.LoginFormProp) => void;
    //changeRegister: () => void;
}

const LoginForm: React.FC<LoginProp> = ({submit}) => {

    const [form] = Form.useForm<User.LoginFormProp>();

    const onSubmit = () => {
        form.validateFields().then(value => submit({...value, uuid: captchaProp.uuid}))
    }

    const [captchaProp, setCaptchaProp] = useState<LoginCaptchaProp>({} as LoginCaptchaProp);


    const loadCaptchaImage = async () => {
        const result = await captchaImage();
        setCaptchaProp(result);
    }

    useEffect(() => {
        loadCaptchaImage();
    }, [])

    return <Form className="account-login-form" form={form}>
        <Form.Item name="username" rules={[{required: true, message: '请输入账号'}]}>
            <Input size="large" prefix={<UserOutlined/>} placeholder="账号"/>
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password size="large" prefix={<LockOutlined/>} placeholder="密码"/>
        </Form.Item>
        <Form.Item name="captcha" rules={[{required: true, message: '请输入验证码'}]}>
            <div className="account-login-form-captcha">
                <Input className="alfc-left" size="large" prefix={<SafetyOutlined/>} placeholder="验证码"/>
                <img onClick={() => loadCaptchaImage()} className="alfc-right" src={captchaProp.image}/>
            </div>
        </Form.Item>
        <Form.Item>
            <Button type="primary" block size="large" onClick={onSubmit}>登 录</Button>
        </Form.Item>
    </Form>
}


const LoginPage: React.FC = () => {

    const userLoginFetch = useStore((state) => state.userLoginFetch)


    const navigate = useNavigate();


    const loginHandle = async (value: LoginFormProp) => {
        try {
            // setLoading(true);
            userLoginFetch(value)
                .then(() => {
                    navigate(HOME_PAGE)
                })
                .catch(err => {
                    console.log(err.message)
                });
        } finally {
            // setLoading(false)
        }

    }


    return <div className="account-root">
        {/*<Spin spinning={loading} >*/}
        <div className="account-root-item">
            <div className="account-root-item-img">
                <img src={LoginBg} alt=""/>
                {/*<img src="https://pro.naiveadmin.com/assets/login-bg.be83cd61.svg" alt="" />*/}
            </div>
        </div>
        <div className="account-root-item root-right-item">
            <div className="account-form">
                <div className="account-top">
                    <div className="account-top-logo">
                        会议管理系统
                    </div>
                    {/*<div className="account-top-desc">一款通用的后台管理系统</div>*/}
                </div>
                <LoginForm submit={loginHandle}/>
            </div>
        </div>
        {/*</Spin>*/}
    </div>
}

export default LoginPage;
