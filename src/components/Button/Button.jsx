import './Button.css';
import { memo } from 'react';

function Button({ children, onClick, className }) {
    console.log('Button');
    return (
        <button className={className} onClick={onClick}>{children}</button>
    );
}

export default memo(Button);