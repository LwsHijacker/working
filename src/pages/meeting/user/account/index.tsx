import {Button, Card} from "antd";
import {useNavigate} from "react-router-dom";

const AccountPage = () => {

    const navigate = useNavigate();

    const back = () => {
        navigate(-1)
    }


    return (
        <>

            <Card>
                <Card>
                    户名：中交第一公路勘察设计研究院有限公司<br/>
                    银行名称：中国农业银行<br/>
                    支行名称：中国农业银行西安科技二路支行<br/>
                    银行账号：26127101040000725
                </Card>
            </Card>
            <Button style={{width: "100%", marginTop: "10px"}} type={"primary"}
                    onClick={() => back()}>返回主菜单</Button>

        </>
    )

}

export default AccountPage