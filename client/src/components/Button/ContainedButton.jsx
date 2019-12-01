import React from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Base = styled.button`
    border : none;
    cursor : pointer;
    border-radius : 3px;
    transition: .3s ease-out;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
    &:hover{
        box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
    }
    &:focus{
        outline : none;
    }
`;

const Primary = styled(Base)(({ theme }) => `
    background-color : ${theme.p};
    color : ${theme.onP};
`);

const Secondary = styled(Base)(({ theme }) => `
    background-color : ${theme.s};
    color : ${theme.onS};
`);

const Buttons = {
    primary: Primary,
    secondary: Secondary
};

const ContainedButton = ({ variant = 'primary', ...props }) => {
    const Rendered = Buttons[variant] || Primary;
    return (
        <ThemeContext.Consumer>
            {value => (
                <Rendered theme={value} {...props} />
            )}
        </ThemeContext.Consumer>
    );
}

export default ContainedButton;