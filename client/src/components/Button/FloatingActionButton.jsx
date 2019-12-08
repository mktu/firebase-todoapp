import React from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Base = styled.button`
    border : none;
    cursor : pointer;
    transition: .3s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
    &:hover{
        box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);
    }
    &:focus{
        outline : none;
    }
`;

const Primary = styled(Base)(({ theme }) => `
    background-color : ${theme.p};
    color : ${theme.onP};
    &:hover{
        background-color : ${theme.pDark};
    }
`);

const Secondary = styled(Base)(({ theme }) => `
    background-color : ${theme.s};
    color : ${theme.onS};
    &:hover{
        background-color : ${theme.sDark};
    }
`);

const Buttons = {
    primary: Primary,
    secondary: Secondary
};

const FloatingActionButton = ({ variant = 'primary', ...props }) => {
    const Rendered = Buttons[variant] || Primary;
    return (
        <ThemeContext.Consumer>
            {value => (
                <Rendered theme={value} {...props} />
            )}
        </ThemeContext.Consumer>
    );
}

export default FloatingActionButton;