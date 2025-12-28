import {Modal} from "antd";
import {useState} from "react";

export default function uploadPic() {
    const [isShow , setIsShow] = useState(false);
    const [currentId, setCurrentId] = useState(0);

    function ok() {
        console.log('ok', currentId);
        setIsShow(false)
    }

    function cancel() {
        console.log('cancel');
        setIsShow(false)
    }

    return {
        visible(id) {
            setCurrentId(id)
            setIsShow(true)
        },
        render() {
            return (
                <>
                    <Modal open={isShow} onOk={ok} onCancel={cancel} title="上传头像" okText="上传" cancelText="取消">
                        上传图片
                    </Modal>
                </>
            )
        }
    }
}