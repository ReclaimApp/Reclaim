import React from "react"
import {Link} from "react-router-dom"
import "./onboarding.css"

const About = (props) => {

    return (
        <div className="landing">
            <div className="header">
                <h1 onClick={() => props.history.push('/')} className="logo" >fbexplorer</h1>
            </div>

            <div className="landing-container">
                <div className="seperator">
                    <h3>fbexplorer lets you reclaim, search, and explore all of your Facebook data</h3>
                    <br/>
                    <h3> I'm sure many of you have seen documentaries like "The Social Dilemma" which outline how our data is farmed, sold, and used against us to increase engagement on platforms like Facebook.
                        This issue has become a focal point of interest for me as an internet user and a free thinking individual.
                        A lot of damage has already been done to our privacy and autonomy online but I hope to empower individuals to take their data back and opt out of these predatory platforms.
                    </h3>
                </div>
                <div className="seperator">
                    <h3>This app does not collect any of your information, you can verify by looking over the code which is open source</h3>
                    <a href='https://github.com/AustinKelsay/fb-explorer' target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <div className="seperator">
                    <h3>I created this simple app as a first iteration on a larger more ambitious project to help users recliam, organize, and search all of their social media data from one dashboard</h3>
                    <br/>
                    <h3>I am currently looking for any cofounders/developers who are interested in this kind of product</h3>
                </div>
                <div className="footer">
                    <h3>How to get in contact with me:</h3>
                    <div className="link-container">
                        <a href="https://github.com/AustinKelsay" target="_blank" rel="noopener noreferrer">Github</a>
                        <a href="https://austinkelsay.codes/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                        <a href="https://twitter.com/ASeries_ofTubes" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://www.linkedin.com/in/austinkelsay/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                <Link to='/' className='home-button'>Home</Link>
            </div>
        </div>
    )
}

export default About