import React from 'react';
import { Container, Tooltip } from '@material-ui/core';
import './FooterComponent.css';

const FooterComponent = props => {
    return (
        <footer className="site-footer">
            <Container>
                <div className="about-header">
                    <h6>About</h6>
                    <p className="text-justify">Shopi-Style <i>SHOPPING FROM ANYWHERE. </i>
                        is a modern e-commerce website platform, built during COVID-19 restriction for easy shopping experience.
                        <br />One of my first apps as software developer. Development technologies: React, Node.js, Express, MongoDB (MERN STACK).
                        </p>
                </div>
                <hr /><br />
                <div className="contact-section">
                    <div>Website development in progress.</div>
                    <policy className="copyright-text">Copyright &copy; 2021 All Rights Reserved by Dan Goldshtein.</policy>
                    <div className="contact-tools">
                        <ul className="social-icons">
                            <li>Contact developer: </li>
                            <Tooltip title="Linkedin">
                                <li><a className="linkedin" href="https://www.linkedin.com/in/dan-goldshtein/"><i className="fa fa-linkedin"></i></a></li>
                            </Tooltip>
                            <Tooltip title="Github">
                                <li><a className="github" href="https://github.com/dangold1"><i className="fab fa-github"></i></a></li>
                            </Tooltip>
                        </ul>
                    </div>
                </div>
            </Container >
        </footer >
    );
}

export default FooterComponent;
