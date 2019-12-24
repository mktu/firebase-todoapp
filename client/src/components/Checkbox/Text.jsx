import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Text = styled.div(({ checked, theme }) => `
    position : relative;
    ${checked ? `
        color:${theme.textS};
        ` : `
        color:${theme.textP};
        `}
    &:after {
        content:'';
        height:2px; 
        ${checked ? `
        width:90%;
        ` : `
        width:0;
        ]`}
        left : 0;
        bottom:50%; 
        position:absolute;
        background:${theme.s}; 
        transition:0.2s ease all; 
    }
`);

export default ({ className, checked, label }) => {
    const theme = useContext(ThemeContext);
    return (
        <Text className={className} checked={checked} theme={theme}>{label}</Text>
    )
};