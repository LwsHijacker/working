import MainMeetingPage from "./mainmeeting"
import SubMeetingPage from "./submeeting"
import { useState } from "react"

const MeetingPage = () => {
    const [showMainMeeting, setShowMainMeeting] = useState<boolean>(true)
    const something = () => {
        setShowMainMeeting(!showMainMeeting)
    }
    return (
        <div>
            {showMainMeeting ? <MainMeetingPage clickMainMeetingName={something} /> : <SubMeetingPage backToMainMeeting={something} />}
        </div>
    )
}

export default MeetingPage