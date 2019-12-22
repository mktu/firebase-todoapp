import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';
import {useMultiLineTextInputState} from '../../hooks';
import getThemeColor from './Color';

const Wrapper = styled.div(({ color, focus }) => `
    position:relative; 
    display : flex;
    align-items: center;
    border-radius : 5px;
    padding : 12px;
    border : 1px solid ${color.dividerColor};
    ${(focus) && `
        border : 2px solid ${color.barColor};
    `}
`);

const Input = styled.textarea(({ color }) => `
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
    position:absolute;
    pointer-events:none;
    left:12px;
    top:-10px;
    font-size:14px!important;
    color:${color.focusLabelColor};
    background-color:white;
`);

const MultiLine = ({ className, onChange, onBlur, value, label, minRows, maxRows, color = 'primary', ...props }) => {
    const {
        ref, 
        currentRows,
        valid, 
        focus, 
        toggeFocus, 
        handleChange, 
        handleLabelClick
    } = useMultiLineTextInputState({onBlur,value, onChange,minRows,maxRows});
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
                rows={currentRows}
                type='text'
            />
        </Wrapper>
    );
}

export default MultiLine;