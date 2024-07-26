import {Button, Card, Form, Input, message, Select, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {meetingQueryById} from "@/api/meeting.ts";
import {useEffect} from "react";
import {meetingUserInvoiceSave} from "@/api/meetinguser.ts";


const UserPayDocForm = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const location = useLocation()

    const {loading, run} = useRequest(meetingQueryById, {
        manual: true,
        onSuccess: (data) => {
            const user = location.state.user
            form.setFieldsValue({
                meetingId: data.id,
                meetingName: data.meetingName,
                userPhone: user.userPhone

            })
        }
    })

    useEffect(() => {
        const mid = location.state.meetingId
        run({id: mid})
    }, []);

    const back = () => {
        navigate(-1)
    }

    const postData = (values: any) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(values.file.file)
        fileReader.onload = (e) => {
            if (e.target) {
                values.userPayDoc = e.target.result
                meetingUserInvoiceSave(values).then(r => {
                        message.success(r)
                        form.resetFields()
                    }
                ).catch(e => {
                    message.error(e.message)
                })
            }else{
                message.warning("上传文件目标不存在")
            }
        }
    }

    const submit = () => {
        form.validateFields().then(values => {
            if (!values.file) {
                message.warning("支付凭证必须上传")
            } else {
                if (values.invoiceType === "-1") {
                    message.warning("发票类型为必填项")
                } else if (values.invoiceType === "1") {
                    if (!values.invoiceHeader || !values.taxNum) {
                        message.warning("当前选择开票,发票抬头及税号为必填项")
                    } else {
                        postData(values)
                    }
                } else if (values.invoiceType === "2") {
                    postData(values)
                }
            }
        })
    }

    return (
        <>
            <Card>
                <Card title={"收款账号"}>
                    户名：西安绝设广告文化传播有限公司<br/>
                    联系电话：029-81109562<br/>
                    银行名称：中国农业银行股份有限公司<br/>
                    支行名称：西安唐延南路支行<br/>
                    银行账号：26126501040002038
                </Card>
                <Form layout="vertical" form={form} initialValues={{InvoiceType: "-1"}}>
                    <Card title={"注册信息"} style={{marginTop: '5px'}}>
                        <Form.Item name={"meetingId"} hidden={true} label={"会议Id"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"meetingName"} hidden={true} label={"会议名称"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"userPhone"} label={"注册手机号"}
                                   tooltip={"上传支付凭证时，需要使用注册用户的手机号"} required={true}
                                   rules={[{required: true, message: "必填项"}, {
                                       pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                       message: '请输入正确的手机号'
                                   }]}>
                            <Input readOnly/>
                        </Form.Item>
                    </Card>
                    <Card title={"支付凭证"} style={{marginTop: '5px'}}>
                        <Form.Item name={"file"} label={"上传支付凭证"} valuePropName={"file"}
                                   rules={[{required: true, message: "必填项"}]}
                                   tooltip={"支付凭证必须上传"} required={true}>
                            <Upload accept={"image/png"} listType={"picture"} maxCount={1} beforeUpload={() => {
                                return false
                            }}>
                                <Button icon={<UploadOutlined/>}>点击上传</Button>
                            </Upload>
                        </Form.Item>
                    </Card>
                    <Card title={"发票消息"} style={{marginTop: '5px'}}>
                        <Form.Item name={"invoiceType"} label={"选择发票类别"}
                                   rules={[{required: true, message: "必填项"}]} required={true} initialValue={"-1"}>
                            <Select>
                                <Select.Option key={"-1"}>请选择</Select.Option>
                                <Select.Option key={"1"}>增值税普通发票</Select.Option>
                                <Select.Option key={"2"}>不开发票</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name={"invoiceHeader"} label={"发票抬头"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"taxNum"} label={"纳税人识别号"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"invoiceUnitAddr"} label={"单位地址"} tooltip={"请按财务报销要求填写"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"invoiceUnitPhone"} label={"单位电话"} tooltip={"请按财务报销要求填写"}>
                            <Input/>
                        </Form.Item>

                    </Card>

                </Form>
            </Card>

            <Button style={{width: "100%", marginTop: "5px"}} type={"primary"} loading={loading}
                    onClick={() => submit()}>缴 费</Button>
            <Button style={{width: "100%", marginTop: "5px"}} type={"primary"} loading={loading}
                    onClick={() => back()}>返 回</Button>

        </>
    )

}

export default UserPayDocForm