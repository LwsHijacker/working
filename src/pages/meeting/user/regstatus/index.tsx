import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card} from "antd";
import {useRequest} from "ahooks";
import {meetingUserQueryStatus} from "@/api/meetinguser.ts";
import {useEffect, useState} from "react";


const RegStatusPage = () => {
    const navigate = useNavigate()
    // const [form] = Form.useForm()
    const location = useLocation()
    const [userRegStatus, setUserRegStatus] = useState("")


    const back = () => {
        navigate(-1)
    }

    const {loading, run} = useRequest(meetingUserQueryStatus, {
        manual: true,
        onSuccess: (data) => {
            if (data.userRegStatus === 0) {
                setUserRegStatus("已填报注册信息，请您完成缴费并上传缴费凭证")
            } else if (data.userRegStatus === 1) {
                setUserRegStatus("缴费已完,等待工作人员审批,预计时间1~2个工作日！")
            } else if (data.userRegStatus === 2) {
                setUserRegStatus("注册确认已经完成，请您按时参加会议！")
            } else if (data.userRegStatus === -1) {
                setUserRegStatus("您还没有完成注册,请先完成注册！")
            } else {
                setUserRegStatus("您提交的注册消息跟缴费凭证未能通过审核,请您联系会务工作人员协助您解决相关的问题！")
            }
        }
    })

    useEffect(() => {
        const user = location.state.user
        run({userPhone: user.userPhone})
    }, []);

    return (
        <Card>
            <Card>
                {loading || userRegStatus}
            </Card>
            <Button style={{width: "100%", marginTop: "10px"}} type={"primary"}
                    onClick={() => back()}>返回主菜单</Button>
        </Card>
    )
}

export default RegStatusPage