import React, { useContext,forwardRef } from 'react';
import styled from 'styled-components';
import getThemeColor from './Color';
import {useTextInputState} from '../../hooks';
import { ThemeContext } from '../../contexts';

const Wrapper = styled.div(({ color }) => `
    position:relative; 
`);

const Input = styled.input(({ color }) => `
    padding:10px 0px 10px 0px;
    width : 100%;
    display:block;
    border:none;
    color : ${color.inputColor};
    border-bottom:1px solid ${color.barColor};
    &:focus{
        outline:none;
        color : ${color.inputFocusColor};
    }
`);

const Label = styled.label(({ color, focus, valid }) => `
    color:${color.labelColor};
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all; 
    ${(focus || valid) && `
        top:-20px;
        font-size:14px!important;
        color:${color.focusLabelColor};
    `}
`);

const Bar = styled.div(({ color, focus, valid }) => `
    position:relative; 
    display:block;
    &:before,&:after {
        content:'';
        height:2px; 
        ${(focus || valid) ? `
            width:50%;
        ` : `
            width:0;
        `}
        bottom:1px; 
        position:absolute;
        background:${color.barColor}; 
        transition:0.2s ease all; 
        -moz-transition:0.2s ease all; 
        -webkit-transition:0.2s ease all;
    }
    &:before{
        left:50%;
    }
    &:after{
        right:50%;
    }
`);

const Default = forwardRef(({ className, onChange, onEnter, value, label, color = 'primary', ...props },_ref) => {
    const {
        valid, 
        focus, 
        toggeFocus, 
        handleChange, 
        handleKeyPress,
    } = useTextInputState({onChange,onEnter,value});
    const themeContext = useContext(ThemeContext);
    const themeColor = getThemeColor(themeContext)[color];
    return (
        <Wrapper className={className} color={themeColor} {...props} >
            <Label
                color={themeColor}
                valid={valid}
                focus={focus}>{label}</Label>
            <Input
                ref={_ref}
                color={themeColor}
                value={value}
                onChange={handleChange}
                onFocus={toggeFocus(true)}
                onBlur={toggeFocus(false)}
                type='text'
                onKeyPress={handleKeyPress}
            />
            <Bar color={themeColor} valid={valid} focus={focus} />
        </Wrapper>
    );
})

export default Default;