import React from "react"
import DataDisplay from "../dashboard/DataDisplay"
import {useSelector} from "react-redux"
import {HashRouter, Route} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

const MessageRouter = () => {
    const messageData = useSelector(state => state.messages)
    console.log("In messageRouter")

    return(
        messageData.map((message) => {
            const path = "/messages/" + message.name
            console.log(path)
            return (
                <HashRouter>
                    <Route key={uuidv4()} path={path} render={(props) => <DataDisplay {...props} data={message.data} />} />
                </HashRouter>
                )
        })
    )
}

export default MessageRouter;