import React, {useContext} from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Button = styled.button(({ theme }) => `
    border : none;
    cursor : pointer;
    color : ${theme.textS};
    &:hover{
        color : ${theme.textP};
    }
    &:focus{
        color : ${theme.textP};
    }
`);

const IconButton = ({ className,...props }) => {
    const theme = useContext(ThemeContext);
    return (
        <Button theme={theme} className={className} {...props}/>
    );
}

export default IconButton;