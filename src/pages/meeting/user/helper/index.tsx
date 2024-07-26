import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {meetingQueryById} from "@/api/meeting.ts";
import {Button, Card, Spin} from "antd";


const MeetingUserRegHepler = () => {
    const [meeting, setMeeting] = useState(null);
    const location = useLocation()
    const navigate = useNavigate()
    const {loading, run} = useRequest(meetingQueryById, {
        manual: true,
        onSuccess: (data) => {
            debugger
            setMeeting(data)
        }
    })
    const back = () => {
        navigate(-1)
    }

    useEffect(() => {
        const meId = location.state.meetingId
        run({id: meId})
    }, []);
    if (meeting) {
        return (<>
            <Card>
                <div dangerouslySetInnerHTML={{__html: meeting.meetingHelper}}></div>
            </Card>
            <Button style={{width: "100%", marginTop: "10px"}} type={"primary"} loading={loading}
                    onClick={() => back()}>返 回</Button>
        </>)

    } else {
        return (<Spin tip="Loading" size="large">
            {"加载中...."}
        </Spin>)
    }


}
export default MeetingUserRegHepler;