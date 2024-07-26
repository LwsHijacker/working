import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, {useState, useEffect} from 'react'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'

interface RichEditorProps {
    onChange: (content: string) => void,
    defaultValue: string
}

const RichEditor: React.FC<RichEditorProps> = ({onChange, defaultValue}) => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法
    // 编辑器内容
    const [html, setHtml] = useState(defaultValue)
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        // const editorConfig = {                         // JS 语法
        placeholder: '请输入会议帮助内容...',
        MENU_CONF: {
            uploadImage: {
                base64LimitSize: 1024 * 1024,
            }
        }
    }

    const editorOnChange = (editor: IDomEditor) => {

        onChange(editor.getHtml())
        setHtml(editor.getHtml())
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{borderBottom: '1px solid #ccc'}}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => editorOnChange(editor)}
                    mode="default"
                    style={{height: '500px', overflowY: 'hidden'}}
                />
            </div>
        </>
    )

}

export default RichEditor