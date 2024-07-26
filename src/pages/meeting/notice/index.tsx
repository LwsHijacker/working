import {useEffect, useState} from "react";

const Notice = () => {

    const [htmlContent, setHtmlContent] = useState('')

    useEffect(() => {
        fetch("../notice.html").then(res => {
            return res.text()
        }).then(txt => {
            console.log(txt)
            setHtmlContent(txt)
        })
    }, []);

    return (
        <div dangerouslySetInnerHTML={{__html: htmlContent}}></div>
    )

}

export default Notice