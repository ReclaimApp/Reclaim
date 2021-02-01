const {ipcRenderer, contextBridge} = require("electron")

contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        sendNotification(message) {
            console.log("Notification firing", message)
            ipcRenderer.send('notify', message);
        }
    }
})