import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextButton as TextButtonBase } from '../Button';
import { ErrorModal } from '../Modal';
import { ThemeContext, AuthContext } from '../../contexts';
import { SigninModal } from '../Modal';
import { useHeaderState } from '../../hooks';

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

const renderUserMenu = (user, onClick, loginMediator) => {
    if (user === null) {
        return (
            <React.Fragment>
                <div>
                    <TextButton onClick={onClick(true)}>LOGIN</TextButton>
                </div>
            </React.Fragment>
        )
    }
    if (user.isAnonymous) {
        return (
            <React.Fragment>
                <div>
                    <UserIcon icon={['fas', 'user']} />
                    <span>Anonymous User</span>
                </div>
                <div>
                    <TextButton onClick={onClick(true)}>LOGIN</TextButton>
                </div>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <div>
                <UserIcon icon={['fas', 'user']} />
                {user.displayName}
            </div>
            <div>
                <TextButton onClick={() => {
                    loginMediator.logout();
                }} >LOG OUT</TextButton>
            </div>
        </React.Fragment>
    );
}
const Header = () => {
    const theme = useContext(ThemeContext);
    const {userState,actions} = useContext(AuthContext);
    const {user} = userState;
    const [modalState,loginError,loginMediator] = useHeaderState(user,actions.login);
    return (
        <Wrapper theme={theme}>
            <Title>TODO APP</Title>
            <Menu>
                {renderUserMenu(user, modalState.onClick, loginMediator)}
            </Menu>
            <ErrorModal
                mainMessage={'Error'}
                detailMessage={loginError.hasError&&loginError.error.message}
                isOpen={loginError.hasError}
                onClose={loginError.refresh}
                />
            <SigninModal
                title={'Choose a provider for log in'}
                isOpen={modalState.value && !loginError.hasError}
                onClickGoogle={()=>{
                    if(!user.isAnonymous){
                        loginMediator.login();
                    }
                    else{
                        loginMediator.link();
                    }
                }}
                onCancel={modalState.onClick(false)}
                onBackgroundClick={modalState.onClick(false)} />
        </Wrapper>
    )
}

export default Header;