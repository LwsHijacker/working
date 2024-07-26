import {Button, Descriptions, Drawer, Image, message, Space} from "antd";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {checkUserStatus, updateUserStatus} from "@/api/meetinguser.ts";

interface UserUpdateProps {
    callBack: () => void,
}

interface Ref {
    showWinForm: (uid: number, visible: boolean, winType: number) => void
}

const CheckUserRegStatusPage = forwardRef<Ref, UserUpdateProps>((props: UserUpdateProps, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [descripDatas, setDescripDatas] = useState<any>(null)
    const [winType, setWinType] = useState<number>(0)
    const [uId, setUId] = useState<any>()
    useImperativeHandle(ref, () => {
        return {
            showWinForm(uid: number, visible: boolean, winType: number) {
                showWinForm(uid, visible, winType)
            }
        }
    }, [])
    const showWinForm = (uid: number, visible: boolean, winType: number) => {
        setUId(uid)
        setWinType(winType)
        setVisible(visible)
    }

    const close = () => setVisible(false);
    const submitData = (status: number) => {
        updateUserStatus({uId: uId, status: status}).then(res => {
            props.callBack()
            message.success(res.message)
        }).catch(e => message.error(e.message))
    }
    useEffect(() => {
        setDescripDatas(null)
        if (!uId) {
            return
        }
        checkUserStatus({uId: uId}).then((data: any) => {
            const des = [{
                key: '1',
                label: '姓名',
                children: <p>{data.userName}</p>,
            }, {
                key: '2',
                label: '电话',
                children: <p>{data.userPhone}</p>,
            }, {
                key: '3',
                label: '年龄',
                children: <p>{data.userAge}</p>,
            }, {
                key: '4',
                label: '性别',
                children: <p>{data.userSex}</p>,
            }, {
                key: '5',
                label: '邮箱',
                children: <p>{data.userEmail}</p>,
            }, {
                key: '6',
                label: '工作单位',
                children: <p>{data.userWorkUnit}</p>,
            }, {
                key: '7',
                label: '研究领域',
                children: <p>{data.userResearchArea}</p>,
            }, {
                key: '8',
                label: '职称',
                children: <p>{data.userProf}</p>,
            }, {
                key: '9',
                label: '职称',
                children: <p>{data.userProf}</p>,
            }, {
                key: '10',
                label: '职位',
                children: <p>{data.userJob}</p>,
            }
            ]
            if (data.userPostType === "1") {
                des.push({
                    key: '11',
                    label: '职位',
                    children: <p>学生</p>,
                })
            } else if (data.userPostType === "2") {
                des.push({
                    key: '11',
                    label: '职位',
                    children: <p>科研人员</p>,
                })
            } else if (data.userPostType === "3") {
                des.push({
                    key: '11',
                    label: '职位',
                    children: <p>工程技术人员</p>,
                })
            }
            if (data.invoiceType === "1") {
                des.push({
                    key: '12',
                    label: '是否开票',
                    children: <p>增值税普通发票</p>,
                })
            } else if (data.invoiceType === "2") {
                des.push({
                    key: '12',
                    label: '是否开票',
                    children: <p>不开发票</p>,
                })
            }
            des.push({
                key: '13',
                label: '发票抬头',
                children: <p>{data.invoiceHeader}</p>,
            })
            des.push({
                key: '14',
                label: '纳税人识别号',
                children: <p>{data.taxNum}</p>,
            })
            des.push({
                key: '15',
                label: '开票单位地址',
                children: <p>{data.invoiceUnitAddr}</p>,
            })
            des.push({
                key: '16',
                label: '开票单位电话',
                children: <p>{data.invoiceUnitPhone}</p>,
            })
            des.push({
                key: '17',
                label: '缴费凭证',
                children: <Image src={data.userPayDoc}/>,
            })
            des.push({
                key: '18',
                label: '学生证',
                children: <Image src={data.userStuId}/>,
            })
            setDescripDatas(des)


        }).catch(e => message.error(e.message))

    }, [uId]);
    return (
        <Drawer
            destroyOnClose={true}
            width={1200}
            title="核对注册信息"
            placement="right"
            onClose={() => close()}
            open={visible}
            extra={
                <Space>
                    <Button type="primary" danger onClick={() => close()}>关闭</Button>
                    <Button type="primary" disabled={winType === 1} onClick={() => submitData(2)}>审核通过</Button>
                    <Button type="primary" disabled={winType === 1} onClick={() => submitData(-2)}>审核不通过</Button>
                </Space>
            }
        >
            <Descriptions bordered={true} column={2} items={descripDatas}/>

        </Drawer>)

})

export default CheckUserRegStatusPage