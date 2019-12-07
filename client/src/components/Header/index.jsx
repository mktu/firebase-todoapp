import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextButton as TextButtonBase } from '../Button';
import { ThemeContext, AuthContext } from '../../contexts';
import { auth } from '../../services';

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
     align-items : center;
     & > div{
        margin-left : 1rem;
     }
`;

const TextButton = styled(TextButtonBase).attrs(
    {
        color: 'onPrimary'
    }
)`
    ${({isSignIn})=> isSignIn ? `
        font-size : 1.2rem;
    ` : `
        font-size : 1.5rem;
    `}
    
`;

const UserIcon = styled(FontAwesomeIcon)(({theme})=>`
    margin-right : 0.5rem;
    color : ${theme.onP};
`);

const Header = ({ ...props }) => {
    const theme = useContext(ThemeContext);
    const user = useContext(AuthContext);
    return (
        <Wrapper theme={theme}>
            <Title>TODO APP</Title>
            <Menu>
                {user.uid ? (
                    <React.Fragment>
                        <div>
                            <UserIcon icon={['fas', 'user']}/>
                            {user.displayName}
                        </div>
                        <div>
                            <TextButton onClick={()=>{
                                auth.logout();
                            }} isSignIn={true}>LOG OUT</TextButton>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div>
                            <TextButton isSignIn={false}>LOGIN</TextButton>
                        </div>
                    </React.Fragment>
                )}

            </Menu>
        </Wrapper>
    )
}

export default Header;