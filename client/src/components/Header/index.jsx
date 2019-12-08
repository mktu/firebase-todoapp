import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextButton as TextButtonBase } from '../Button';
import { ThemeContext, AuthContext } from '../../contexts';
import { SigninModal } from '../Modal';
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
    font-size : 1.2rem;
`;

const UserIcon = styled(FontAwesomeIcon)(({ theme }) => `
    margin-right : 0.5rem;
    color : ${theme.onP};
`);

const Header = ({ ...props }) => {
    const theme = useContext(ThemeContext);
    const user = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);
    const toggleShowLogin = (show) => ()=> {setShowLogin(show)};
    return (
        <Wrapper theme={theme}>
            <Title>TODO APP</Title>
            <Menu>
                {user.uid ? (
                    <React.Fragment>
                        <div>
                            <UserIcon icon={['fas', 'user']} />
                            {user.displayName}
                        </div>
                        <div>
                            <TextButton onClick={() => {
                                auth.logout();
                            }} >LOG OUT</TextButton>
                        </div>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <div>
                                <TextButton onClick={toggleShowLogin(true)}>LOGIN</TextButton>
                            </div>
                        </React.Fragment>
                    )}

            </Menu>
            <SigninModal
                title='Choose a provider for log in'
                isOpen={showLogin}
                onCancel={toggleShowLogin(false)}
                onBackgroundClick={toggleShowLogin(false)} />
        </Wrapper>
    )
}

export default Header;