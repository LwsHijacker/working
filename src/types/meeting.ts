namespace Meeting {
    export interface MeetingUserPageProp {
        page: number;
        size: number;
        userName?: string; // 姓名
        meetingName?: string; // 会议名称
        userPhone?: string; // 手机号
        userCardId?: string
    }

    export const DefaultPageProp: MeetingUserPageProp = {page: 1, size: 10,};
}

export default Meeting