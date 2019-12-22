import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';
import useTextInputState from '../../hooks/useTextInputState';
import getThemeColor from './Color';

const Wrapper = styled.div(({ color, focus }) => `
    position:relative; 
    display : flex;
    align-items: center;
    border-radius : 5px;
    padding : 10px;
    border : 1px solid ${color.dividerColor};
    ${(focus) && `
        border : 2px solid ${color.barColor};
    `}
`);

const Input = styled.input(({ color }) => `
    padding:10px 0px 10px 0px;
    width : 100%;
    display:block;
    border:none;
    color : ${color.inputColor};
    &:focus{
        outline:none;
        color : ${color.inputFocusColor};
    }
`);

const Label = styled.label(({ color, focus, valid }) => `
    color:${color.labelColor};
    font-weight:normal;
    transition:0.5s all; 
    cursor : text;
    ${(focus || valid) && `
        position:absolute;
        pointer-events:none;
        left:12px;
        top:-10px;
        font-size:14px!important;
        color:${color.focusLabelColor};
        background-color:white;
    `}
`);

const Contained = ({ className, onChange, onBlur, onEnter, value, label, color = 'primary', ...props }) => {
    const {
        ref, 
        valid, 
        focus, 
        toggeFocus, 
        handleChange, 
        handleKeyPress,
        handleLabelClick
    } = useTextInputState({onBlur,value, onChange,onEnter});
    const themeContext = useContext(ThemeContext);
    const themeColor = getThemeColor(themeContext)[color];
    return (
        <Wrapper
            className={className}
            valid={valid}
            focus={focus} 
            color={themeColor}
            {...props} >
            <Label
                id='label'
                color={themeColor}
                valid={valid}
                onClick={handleLabelClick}
                focus={focus}>
                {label}
            </Label>
            <Input
                id='input'
                ref={ref}
                color={themeColor}
                value={value}
                onChange={handleChange}
                onFocus={toggeFocus(true)}
                onBlur={toggeFocus(false)}
                type='text'
                onKeyPress={handleKeyPress}
            />
        </Wrapper>
    );
}

export default Contained;