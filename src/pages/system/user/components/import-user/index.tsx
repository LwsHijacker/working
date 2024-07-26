import {Button, Divider, Drawer, message, Space, Upload} from "antd";
import React from "react";
import {User} from "@/types";
import {InboxOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import styled from "@emotion/styled";

const ImportUserDrawer: React.FC<User.ImportUserDrawerProp> = ({visible, close}) => {

    const uploadBeforeHandler = (file: RcFile) => {
        // 校验文件类型
        console.log('文件类型', file.size, file.type);
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            message.warning('文件类型非Excel文件');
            return false
        }
        // 校验文件大小
        if (file.size > 50 * 1024) {
            message.warning('文件大小超过系统限制');
            return false
        }
    }



    return <Drawer
        width={550}
        title="导入用户信息"
        placement="right"
        onClose={() => close(false)}
        open={visible}
        extra={
            <Space>
                <Button type="primary" danger onClick={() => close(false)}>取消</Button>
            </Space>
        }
    >

        <UploadContainer
            name="file"
            maxCount={1}
            multiple={false}
            style={{height: 300}}
            beforeUpload={(file) => uploadBeforeHandler(file)}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">
                支持单个文件上传。支持的Excel文件格式：.xlsx。
            </p>
        </UploadContainer>
        <BtnContainer>
            <Button type='primary'>下载用户上传Excel文件模板</Button>
            <Button type='primary' style={{marginLeft: 10}}>确认上传</Button>
        </BtnContainer>
    </Drawer>
}

const UploadContainer = styled(Upload.Dragger)`
  .ant-upload-wrapper {
    .ant-upload-drag {
      height: 200px;
    }
  }
`

const BtnContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export default ImportUserDrawer;
