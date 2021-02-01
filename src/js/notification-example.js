import React from "react"
import "normalize.css"

const NotificationExample = () => {
    return(
        <div>
            <h1>Hello from App test</h1>
            <button 
            onClick={() => electron.notificationApi.sendNotification("test")}
            >Notify</button>
        </div>
    )
}

export default NotificationExample