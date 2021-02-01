import React from "react"
import DataDisplay from "../dashboard/DataDisplay"
import {useSelector} from "react-redux"
import {Route} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

const MessageRouter = () => {
    const messageData = useSelector(state => state.messages)


    return(
        messageData.map((message) => {
            const path = "/messages/" + message.name
            return <Route key={uuidv4()} path={path} render={(props) => <DataDisplay {...props} data={message.data} />} />
        })
    )
}

export default MessageRouter;