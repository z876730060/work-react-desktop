import { MicroApp } from '@micro-zoe/micro-app'
import { useEffect, useState } from 'react'
import { getMicroAppDetailByKeyApi } from '../api/microApp'

export default async function MAppPage({microApp,path}) {
    const [url, setUrl] = useState('')
    console.log('即将跳转至',url)
    useEffect(() => {
        getMicroAppDetailByKeyApi(microApp).then(res => setUrl(res.data.baseUrl + path))
    }, [microApp, path])
    return (
        <div>
        <micro-app name='my-app' url={url} iframe></micro-app>
        </div>
    )
}