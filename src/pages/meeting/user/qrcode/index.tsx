import {Button, Image, Space} from "antd";

import wxq from "@/assets/img/wxq.png"
import {useNavigate} from "react-router-dom";

const MeetingShowQrcodePage = () => {
    const navigate = useNavigate()
    const back = () => {
        navigate("/meeting/nav")
    }
    return (
        <Space direction="vertical">
            <Image src={wxq}/>
            <Button style={{width: "100%", marginTop: "5px"}} type={"primary"}
                    onClick={() => back()}>返 回</Button>
        </Space>

    )
}
export default MeetingShowQrcodePage