import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Button, Card, Form, Input, message, Select, Upload, Checkbox, Radio } from "antd";
import {useRequest} from "ahooks";
import {meetingQueryById} from "@/api/meeting.ts";
import {UploadOutlined} from "@ant-design/icons";
import { meetingUserQueryStatus, meetingUserSave } from "@/api/meetinguser.ts";
import { submeetingQueryByMainId } from "@/api/submeeting";


const MeetingUserRegFormPage = () => {
    interface subMeeting {
        groupCode: string
        id: number
        mainId: number
        subMeetingBeginDate: string
        subMeetingCoOrganizer: string
        subMeetingEndDate: string
        subMeetingHelper: string
        subMeetingHost: string
        subMeetingName: string
        subMeetingOrganizer: string
        subMeetingRemark: string
    }

    const location = useLocation()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [options, setOptions] = useState<{ label: string, value: string, group: string }[]>([]);

    const getSubMeetingsByMainId = (id: number) => {
        submeetingQueryByMainId({ mainId: id }).then(
            response => {
                const data = response as subMeeting[]
                const checkboxOptions = data.map(subMeeting => ({
                    label: subMeeting.subMeetingName,
                    value: subMeeting.subMeetingName,
                    group: subMeeting.groupCode
                }));
                setOptions(checkboxOptions);
            }
        ).catch(e => console.log(e.message))
    }

    const {loading, run} = useRequest(meetingQueryById, {
        manual: true,
        onSuccess: (data) => {
            const user = location.state.user
            meetingUserQueryStatus({userPhone: user.userPhone}).then(u => {
                u.meetingId = data.id
                u.meetingName = data.meetingName
                form.setFieldsValue(u)
                getSubMeetingsByMainId(data.id) // Call the function here
            }).catch(e => console.log(e.message))
        }
    })


    const submit = () => {
        form.validateFields().then(values => {
            console.log(values)
            if (values.userPostType === "-1") {
                message.warning("职务为必选项")
            } else if (values.userPostType === "1" && !values.file) {
                message.warning("您当前选择职为学生,请上传证件后再提交数据")
            } else {
                if (values.userPostType === "1") {
                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(values.file.file)
                    fileReader.onload = (e) => {
                        if (e.target) {
                            values.userStuId = e.target.result
                            meetingUserSave(values).then(r => {
                                    message.success(r)
                                    form.resetFields()
                                navigate("/meeting/qrcode")
                                }
                            ).catch(e => console.log(e))
                        } else {
                            message.warning("上传文件目标不存在")
                        }
                    }
                } else if (values.userPostType === "2" || values.userPostType === "3") {
                    meetingUserSave(values).then(r => {
                            message.success(r)
                            form.resetFields()
                        }
                    ).catch(e => console.log(e))
                }
            }
        })
    }

    const back = () => {
        navigate(-1)
    }
    useEffect(() => {
        const mid = location.state.meetingId
        run({id: mid})
    }, []);



    const CheckboxGroup = Checkbox.Group;

    return (
        <Card>
            <Card>
                <Form layout="vertical" form={form}>
                    <Form.Item name={"meetingId"} hidden={true} label={"会议Id"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"meetingName"} hidden={true} label={"会议名称"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userPassword"} hidden={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userRegStatus"} hidden={true} initialValue={0}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userPhone"} label={"手机号码"} required={true}
                               rules={[{required: true, message: "必填项"}, {
                                   pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                   message: '请输入正确的手机号'
                               }]}>
                        <Input readOnly/>
                    </Form.Item>
                    <Form.Item name={"userName"} label={"姓   名"} required={true}
                               rules={[{required: true, message: "必填项"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userCardId"} label={"身份证号"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userAge"} label={"年   龄"} required={true}
                               rules={[{required: true, message: "必填项"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userSex"} label={"性   别"} rules={[{required: true, message: "必填项"}]}
                               required={true} initialValue={"-1"}>
                        <Select>
                            <Select.Option key={"-1"}>请选择</Select.Option>
                            <Select.Option key={"1"}>男</Select.Option>
                            <Select.Option key={"2"}>女</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"userEmail"} label={"邮箱地址"} required={true}
                               rules={[{required: true, message: "必填项"}, {type: "email"}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name={"userWorkUnit"} label={"工作单位"} rules={[{required: true, message: "必填项"}]}
                               required={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userJob"} label={"职  位"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userProf"} label={"职   称"} rules={[{required: true, message: "必填项"}]}
                               required={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userResearchArea"} label={"研究领域"}
                               rules={[{required: true, message: "必填项"}]} required={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"userPostType"} label={"职   业"} required={true}
                               rules={[{required: true, message: "必填项"}]}
                               tooltip={"如果您是学生,请在后面选择上传您的学生证"} initialValue={"-1"}>
                        <Select>
                            <Select.Option key={"-1"}>请选择</Select.Option>
                            <Select.Option key={"1"}>学生</Select.Option>
                            <Select.Option key={"2"}>科研人员</Select.Option>
                            <Select.Option key={"3"}>工程技术人员</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item noStyle={true} dependencies={["userPostType"]}>
                        {({getFieldValue}) => {
                            const type = getFieldValue('userPostType')
                            if (type === '1') {
                                return (
                                    <Form.Item name={"file"} required={true}
                                               rules={[{required: true, message: "必填项"}]} label={"上传学生证"}
                                               valuePropName={"file"}
                                               tooltip={"只支持png格式图片文件上传"}>
                                        <Upload accept={"image/png"} listType={"picture"} maxCount={1}
                                                beforeUpload={() => {
                                                    return false
                                                }}>
                                            <Button icon={<UploadOutlined/>}>点击上传</Button>
                                        </Upload>
                                    </Form.Item>
                                )
                            }
                        }}
                    </Form.Item>

                    <Form.Item name="interestedSubject" label="会议主题">
                        <Radio.Group>
                            {options.filter(option => option.group === "主旨主题类").map(option => (
                                <Radio key={option.value} value={option.label}>{option.label}</Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name={"interestedSubMeeting"} label="感兴趣的分论坛" tooltip={"选择你感兴趣的分论坛主题"}>
                        <CheckboxGroup options={options.filter(option => option.group === "分论坛类")} />
                    </Form.Item>

                </Form>
            </Card>

            <Button style={{width: "100%", marginTop: "10px"}} type={"primary"} loading={loading}
                    onClick={() => submit()}>注 册</Button>
            <Button style={{width: "100%", marginTop: "10px"}} type={"primary"} loading={loading}
                    onClick={() => back()}>返 回</Button>

        </Card>
    )

}

export default MeetingUserRegFormPage;