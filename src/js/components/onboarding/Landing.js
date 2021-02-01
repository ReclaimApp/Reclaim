import React from "react"
import {Tooltip, OverlayTrigger} from "react-bootstrap";
import {Link} from "react-router-dom"
import {FaHandPointRight} from "react-icons/fa"
import "./onboarding.css"

const Landing = (props) => {
    const renderTooltip = (props) => (
        <Tooltip className='skip-tooltip' {...props}>
          Already have your data?
        </Tooltip>
      );

    return (
        <div className="landing">
            <div className="header">
                <h1 onClick={() => props.history.push('/')} className="logo" >fbexplorer</h1>
                <p onClick={() => props.history.push('/about')} className="about">About</p>
            </div>

            <div className="landing-container">
                <h3>fbexplorer lets you reclaim, search, and explore all of your Facebook data</h3>
                {/* <video 
                    type="video/mp4" 
                    src={} 
                    poster={} 
                    className="description-video" 
                    muted 
                    playsInline 
                    autoPlay  /> */}
                <h2 className="step">Step 1: Log into Facebook</h2>
                <div  id="fb-login"
                    className="fb-login-button" 
                    data-scope="public_profile"
                    data-width="" 
                    data-size="large" 
                    data-button-type="login_with" 
                    data-auto-logout-link="true" 
                    data-use-continue-as="true">
                </div>
                <div className="button-container">
                    <div className="skip-container">
                        <FaHandPointRight className='icon-hand-point' />
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltip}
                        >
                            <Link to='/drop' className="skip-button">Skip</Link>
                        </OverlayTrigger>
                    </div>
                    <Link to='/download' className='next'>Download your data</Link>
                </div>
            </div>
        </div>
    )
}

export default Landing