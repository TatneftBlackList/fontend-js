import React, { useEffect } from 'react';
import './Popup.css';

function Popup({ children, isOpen, onClose, autoCloseDuration }) {
    useEffect(() => {
        if (isOpen && autoCloseDuration) {
            const timer = setTimeout(onClose, autoCloseDuration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, autoCloseDuration]);

    if (!isOpen) return null;

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}

export default Popup;
