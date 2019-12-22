import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Wrapper = styled.div`
    border-radius : 1px;
    padding : 1rem;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,.12);
    ${({ theme }) => `
        background-color : ${theme.bgcolor};
    `}
`;



const Paper = ({ className, children }) => {
    const theme = useContext(ThemeContext);
    return (
        <Wrapper className={className} theme={theme}>
            {children}
        </Wrapper>
    );
}

export default Paper;