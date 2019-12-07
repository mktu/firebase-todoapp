import React, {useContext} from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Base = styled.button`
    border : none;
    cursor : pointer;
    background-color : transparent;
    &:focus{
        outline : none;
    }
`;

const Primary = styled(Base)(({ theme }) => `
    color : ${theme.p};
    &:hover{
        color : ${theme.pDark};
    }
    &:focus{
        color : ${theme.pDark};
    }
`);

const Secondary = styled(Base)(({ theme }) => `
    color : ${theme.s};
    &:hover{
        color : ${theme.sDark};
    }
    &:focus{
        color : ${theme.sDark};
    }
`);

const OnPrimary = styled(Base)(({ theme }) => `
    color : ${theme.onP};
`);

const OnSecondary= styled(Base)(({ theme }) => `
    color : ${theme.onS};
`);

const Buttons = {
    primary: Primary,
    secondary: Secondary,
    onPrimary: OnPrimary,
    onSecondary: OnSecondary
};

const TextButton = ({ className, color = 'primary', ...props }) => {
    const theme = useContext(ThemeContext);
    const Rendered = Buttons[color] || Primary;
    return (
        <Rendered theme={theme} className={className} {...props}/>
    );
}

export default TextButton;