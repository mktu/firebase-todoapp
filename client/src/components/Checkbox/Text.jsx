import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Text = styled.div(({ checked, theme, strikethrough }) => `
    position : relative;
    ${checked ? `
        color:${theme.textS};
        ` : `
        color:${theme.textP};
        `}
    &:after {
        content:'';
        height:2px; 
        ${checked && strikethrough ? `
        width:90%;
        ` : `
        width:0;
        ]`}
        left : 0;
        bottom:50%; 
        position:absolute;
        background:${theme.s}; 
        ${checked && `
            transition:0.2s ease all; 
        `
        }
    }
`);

export default ({ className, checked, strikethrough=false, children }) => {
    const theme = useContext(ThemeContext);
    return (
        <Text className={className} strikethrough={strikethrough} checked={checked} theme={theme}>{children}</Text>
    )
};