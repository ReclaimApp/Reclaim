import React, {useState} from "react"
import {Link} from "react-router-dom"
import {useDropzone} from "react-dropzone"
import {useDispatch } from 'react-redux'
import {GET_INDEX_HTML, POPULATE_CATEGORIES, USER_DATA, POPULATE_IMAGES, POPULATE_VIDEO, POPULATE_MESSAGES} from "../../store/Actions"
import {FaFileUpload} from "react-icons/fa"
import { Ring } from 'react-spinners-css';
import {ListGroup} from "react-bootstrap";
import {FaHandPointDown} from "react-icons/fa"
import Zoom from 'react-reveal/Zoom';

const Drop = (props) => {
    const [ring, setRing] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const dispatch = useDispatch()


    const ringTimer = () => {
        setRing(true)
        setTimeout(() => {
            setRing(false)
            setDataReady(true)
        }, 6000)
    }

    const handleLog = (e) => {
        e.preventDefault()
        alert("Pages with many photos/videos may experience a delay when rendering")
        dispatch({type: USER_DATA})
        props.history.push('/categories')
    }

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            acceptedFiles.map((file) => {
                ringTimer()
                const reader = new FileReader()
                reader.onload = function(event) {
                    if (file.webkitRelativePath.includes("messages") && file.name.includes(".html")) {
                        let fileSplit = file.path.split('/')
                        let name = fileSplit[4]
                        dispatch({type: POPULATE_MESSAGES, payload: {name: name, data: event.target.result}})
                    }
                    
                    //split up into multiple cases
                    if (file.type === "image/jpeg" || file.type === "image/png" || file.type.includes("image")) {
                        dispatch({type: POPULATE_IMAGES, payload: {name: file.name, data: URL.createObjectURL(file)}})
                    }
                    if (file.type === "video/mp4" || file.type.includes('video') || file.type.includes('mp4')) {
                        dispatch({type: POPULATE_VIDEO, payload: {name: file.name, data: URL.createObjectURL(file)}})
                    }                    
                    if (file.name === 'index.html') {
                        dispatch({type: GET_INDEX_HTML, payload: event.target.result})
                    }
                    else if (file.name.includes('.html')) {
                        const path = file.path.split("/")
                        dispatch({type: POPULATE_CATEGORIES, payload: {path: path[2], name: file.name, data: event.target.result}})
                    }
                    else {
                        if (file.type && file.type.includes("image")) {
                            try {
                                dispatch({type: POPULATE_IMAGES, payload: {name: file.name, data: URL.createObjectURL(file)}})
                            }
                            catch {
                                console.log(file)
                            }
                        }
                        else if (file.type && file.type.includes("video")) {
                            try {
                                dispatch({type: POPULATE_VIDEO, payload: {name: file.name, data: URL.createObjectURL(file)}})
                            }
                            catch {
                                console.log(file)
                            }
                        }
                    }
                  };
                reader.readAsText(file);

                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            })
        }
    })

    return (
        <div className="landing">
            <h1 onClick={() => props.history.push('/')} className="logo" >fbexplorer</h1>
            <div className="landing-container">
                <ListGroup className="list-group-drop">
                    <ListGroup.Item>You can now take the folder with all of your Facebook data and drop it into the file input below.</ListGroup.Item>
                    <ListGroup.Item>When you are in a specific category like "Your photos" or "Posts" hit ctrl + f to search for keywords or paticular years to explore</ListGroup.Item>
                    <ListGroup.Item className="underline">Your Facebook information will NEVER be stored or collected in this app.</ListGroup.Item>
                </ListGroup>
                <h2 className="step-drop">Step 3: Drag and drop your data below to start exploring</h2>

                <div className='file-drop'>
                <FaHandPointDown className='icon-hand-point-down' />
                    <div className='file-box' {...getRootProps()}>
                    <div className="ring-container">
                            {
                                ring ?
                                <Zoom>
                                    <Ring/>
                                </Zoom>
                                : <FaFileUpload className='icon-file-drop' />
                                
                            }
                    </div>
                        <input {...getInputProps()} />
                    </div>
                    
                </div>
                <div className="button-container-download">
                    <Link to='/' className='next-download'>Back</Link>
                    <div style={!dataReady ? {opacity: '0.4', cursor: 'default'} : null} onClick={dataReady ? handleLog : null} className={dataReady ? 'glowing' : 'next-download'}>Explore</div>
                </div>
            </div>
        </div>
    )
}

export default Drop