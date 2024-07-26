import React from "react";
import styled from "@emotion/styled";
import {useLocation, useNavigate} from "react-router-dom"

const MeetingRegNavPage: React.FC<void> = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const navToMeetingUserRegPage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const meetingId = location.state.meetingId
        const user = location.state.user
        navigate("/meeting/user/reg/", {state: {meetingId: meetingId, user: user}})
    }
    const navToMeetingHelperPage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const meetingId = location.state.meetingId
        const user = location.state.user
        navigate("/meeting/user/reg/helper", {state: {meetingId: meetingId, user: user}})
    }

    const updatePayDoc = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const meetingId = location.state.meetingId
        const user = location.state.user
        navigate("/meeting/user/pay", {state: {meetingId: meetingId, user: user}})
    }


    const queryUserRegStatus = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const meetingId = location.state.meetingId
        const user = location.state.user
        navigate("/meeting/user/status/query", {state: {meetingId: meetingId, user: user}})
    }

    return (<MNPageContaner>
            <div className="all">
                <div className="name">第一届极端环境交通基础设施高品质建养与防减灾学术会议</div>
                <div className="menu" onClick={(e) => {
                    navToMeetingHelperPage(e)
                }}>注册流程
                </div>
                <div className="menu" onClick={(e) => navToMeetingUserRegPage(e)}>会议注册</div>
                <div className="menu" onClick={(e) => updatePayDoc(e)}>会议缴费</div>
                <div className="menu" onClick={(e) => queryUserRegStatus(e)}>注册状态</div>
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

export default MeetingRegNavPage