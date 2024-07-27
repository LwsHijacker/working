import MainMeetingPage from "./mainmeeting"
import SubMeetingPage from "./submeeting"
import { useState } from "react"

const MeetingPage = () => {
    const [showMainMeeting, setShowMainMeeting] = useState<boolean>(true)
    const [currentMainMeetingId, setCurrentMainMeetingId] = useState<number>(0)
    const changeComponent = (id?: number) => {
        if (id) {
            setCurrentMainMeetingId(id)
        }
        setShowMainMeeting(!showMainMeeting)
    }
    return (
        <div>
            {showMainMeeting ?
                <MainMeetingPage clickMainMeetingName={changeComponent} />
                : <SubMeetingPage mainMeetingId={currentMainMeetingId} backToMainMeeting={changeComponent} />}
        </div>
    )
}

export default MeetingPage