import React, { useState, useContext } from 'react';
import styled from 'styled-components';
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
    border-bottom:1px solid ${color.dividerColor};
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

const getThemeColor = (theme) => {
    return {
        primary: {
            labelColor: theme.textS,
            inputColor: theme.textS,
            focusLabelColor: theme.p,
            inputFocusColor: theme.textP,
            barColor: theme.p,
            textColor: theme.textP,
            dividerColor: theme.pLight
        },
        secondary: {
            labelColor: theme.textS,
            inputColor: theme.textS,
            focusLabelColor: theme.s,
            inputFocusColor: theme.textP,
            barColor: theme.s,
            textColor: theme.textS,
            dividerColor: theme.sLight
        }
    };
}

const TextInput = ({ className, onChange, onEnter, value, label, color = 'primary', ...props }) => {
    const [focus, setFocus] = useState(false);
    const [valid, setValid] = useState(false);
    const themeContext = useContext(ThemeContext);
    const toggeFocus = (isFocus) => () => { setFocus(isFocus) };
    const themeColor = getThemeColor(themeContext)[color];
    return (
        <Wrapper className={className} color={themeColor} {...props} >
            <Label
                id='label'
                color={themeColor}
                valid={valid}
                focus={focus}>{label}</Label>
            <Input
                id='input'
                color={themeColor}
                value={value}
                onChange={(e) => {
                    setValid(Boolean(e.target.value));
                    onChange && onChange(e);
                }}
                onFocus={toggeFocus(true)}
                onBlur={toggeFocus(false)}
                type='text'
                onKeyPress={(e) => {
                    if (e.key.toLowerCase() === 'enter') {
                        if (onEnter) {
                            onEnter(e);
                            e.preventDefault(); // for disable onChange event.
                        }
                    }
                }}
            />
            <Bar color={themeColor} valid={valid} focus={focus} />
        </Wrapper>
    );
}

export default TextInput;