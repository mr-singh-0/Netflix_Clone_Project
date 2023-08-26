import React, { useState, useEffect } from 'react';
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                src="https://media.netflix.com/static/images/Netflix-Logo.svg"
                alt="Netflix Logo"
                className='nav__logo'
            />

            <img
                className='nav__avatar'
                src="https://pbs/twimg.com/profile_image/1240119990411155"
                alt="Avatar"
            />
        </div>
    );
}

export default Nav;
