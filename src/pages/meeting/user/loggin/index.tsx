import {Button, Form, Input, message} from "antd";
import {meetingUserLogin} from "@/api/meetinguser.ts";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";

const meetingId: number = 2

const MeetingUserLoginPage = () => {
    const [form] = Form.useForm()
    const navigation = useNavigate()

    const userLogin = () => {
        form.validateFields().then(value => {
            meetingUserLogin(value).then(res => {
                message.success(res.message)
                navigation("/meeting/nav", {state: {meetingId: meetingId, user: res.result}})
                form.resetFields()
            }).catch(error => {
                message.error(error.message)
                form.resetFields()
            })

        })
    }
    return (
        <MNPageContaner>
            <div className="all">
                <div className="name">第一届极端环境交通基础设施高品质建养与防减灾学术会议</div>
                <div className={"en-name"}>
                    <Form form={form} layout={"vertical"}>
                        <Form.Item hidden={true} name={"meetingId"} initialValue={meetingId}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={<label style={{color: "white"}}>请输入手机号</label>} required={true}
                                   name={"userPhone"} rules={[{required: true, message: '手机号注册必须填写'}, {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                            message: '请输入正确的手机号'
                        }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={<label style={{color: "white"}}>请输入密码</label>} required={true}
                                   name={"userPassword"} rules={[{required: true, message: '手机密码必须填写'}]}>
                            <Input.Password/>
                        </Form.Item>
                    </Form>
                </div>
                <div className={"en-name"}>
                    <Button style={{width: "100%"}} type={"primary"}
                            onClick={() => userLogin()}>登录/注册</Button>
                </div>

                <div
                    className={"en-name"}>说明:会议注册时,如您已经注册,请输入手机号及密码直接点击登录；如果您还未完成注册，请输入手机号和密码进行注册,请记住您输入的密码，下次登录时可用到！
                </div>
            </div>


        </MNPageContaner>
    )

}

const MNPageContaner = styled.div`
    //margin: 0;
    //margin-bottom: 0;
    position: absolute;
    padding: 0;
    box-sizing: border-box;
    font-family: "MicroSoft YaHei";
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #001854, #012d9b);

    .all {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 1px;
    }

    .name {
        position: relative;
        width: 80%;
        margin: 6.5rem auto 1.25rem auto;
        text-align: center;
        font-size: 18px;
        color: rgba(229, 244, 253, 0.9);
        letter-spacing: .0625rem;
    }

    .en-name {
        position: relative;
        width: 80%;
        margin: 0 auto 75px auto;
        text-align: center;
        font-size: 12px;
        color: rgba(147, 194, 221, 0.6);
    }

    .eq {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto 15px auto;
        border-radius: 15px;
        border: 5px solid rgba(41, 109, 182, 0.8);
        background-color: #fff;
        padding: 5px;
    }

    img {
        border-radius: 15px;
    }

    .menu {
        width: 200px;
        height: 30px;
        line-height: 30px;
        margin: auto;
        margin-top: 15px;
        text-align: center;
        font-size: 12px;
        border-radius: 15px;
        border: 1px solid rgba(147, 194, 221, 0.5);
        color: rgba(147, 194, 221, 0.7);
        cursor: pointer;
    }

    .menu:hover {
        color: rgba(147, 194, 221, 0.8);
    }

`

export default MeetingUserLoginPage