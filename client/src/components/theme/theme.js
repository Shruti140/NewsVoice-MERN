import { useState, useEffect } from 'react';
import './theme.css'

const Theme = () => {

    const [theme, setTheme] = useState('standard');

    useEffect(() => {
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            applyTheme('standard');
        }
    }, []);

    const changeTheme = (color) => {
        localStorage.setItem('savedTheme', color);
        setTheme(color);
        applyTheme(color);
    };

    const applyTheme = (color) => {
        document.body.className = color;
        const titleElement = document.getElementById('title');
        if (titleElement) {
            if (color === 'darker') {
                titleElement.classList.add('darker-title');
            } else {
                titleElement.classList.remove('darker-title');
            }
        }
        const inputElement = document.querySelector('input');
        if (inputElement) {
            inputElement.className = `${color}-input`;
        }
    };

    return (
        <div className="flexrow-container">
            <div
                className="standard-theme theme-selector"
                onClick={() => changeTheme('standard')}
            ></div>
            <div
                className="light-theme theme-selector"
                onClick={() => changeTheme('light')}
            ></div>
            <div
                className="darker-theme theme-selector"
                onClick={() => changeTheme('darker')}
            ></div>
        </div>
    );
}

export default Theme;