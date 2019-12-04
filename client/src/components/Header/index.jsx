import React, {useContext} from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';

const Wrapper = styled.header(({ theme }) => `
    background-color: ${theme.p};
    color : ${theme.onP};
    display : flex;
    align-items : center;
    padding : 1rem;
    &>:last-child {
        margin-left :auto;
    }
`);
const Title = styled.h1`
    margin : 0;
`;
const Menu = styled.div`
     display : flex;
     & > div{
        margin-left : 1rem;
     }
`;

const Header = ({ ...props }) => {
    const theme = useContext(ThemeContext);
    return (
        <Wrapper theme={theme}>
            <Title>TODO APP</Title>
            <Menu>
                <div>
                    Sign up
                </div>
                <div>
                    Login
                </div>
            </Menu>
        </Wrapper>
    )
}

export default Header;