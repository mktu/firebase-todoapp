import { useState, useRef } from 'react';

export default function ({value,onChange,onBlur,onEnter}) {
    const [focus, setFocus] = useState(false);
    const valid = Boolean(value);
    const ref = useRef(null);
    const toggeFocus = (isFocus) => () => { 
        setFocus(isFocus);
        !isFocus && onBlur && onBlur() 
    };

    const handleChange = (e) => {
        onChange && onChange(e);
    }

    const handleKeyPress = (e) => {
        if (e.key.toLowerCase() === 'enter') {
            if (onEnter) {
                onEnter(e);
                e.preventDefault(); // for disable onChange event.
            }
        }
    }

    const handleLabelClick = ()=>{
        ref.current.focus();
    }

    return { ref, focus, valid, handleChange, toggeFocus, handleKeyPress, handleLabelClick };
}