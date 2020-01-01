import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextButton as TextButtonBase } from '../Button';
import { ErrorModal } from '../Modal';
import { ThemeContext } from '../../contexts';
import { SigninModal } from '../Modal';
import Paper from '../Paper';
import { useHeaderState } from '../../hooks';

const Wrapper = styled(Paper)(({ theme }) => `
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

const Header = () => {
    const theme = useContext(ThemeContext);
    const {t} = useTranslation();
    const { signinModalState, errorModalState, user } = useHeaderState();
    
    let menu = null;
    if (user === null) {
        menu = (<div><TextButton onClick={signinModalState.show}>LOGIN</TextButton></div>)
    }
    else if (user.isAnonymous) {
        menu = (
            <React.Fragment>
                <div>
                    <UserIcon icon={['fas', 'user']} />
                    <span>Anonymous User</span>
                </div>
                <div>
                    <TextButton onClick={signinModalState.show}>LOGIN</TextButton>
                </div>
            </React.Fragment>
        )
    }
    else {
        menu = (
        <React.Fragment>
            <div>
                <UserIcon icon={['fas', 'user']} />
                {user.displayName}
            </div>
            <div>
                <TextButton onClick={signinModalState.handleLogout} >LOG OUT</TextButton>
            </div>
        </React.Fragment>)
    }

    return (
        <Wrapper theme={theme}>
            <Title>TODO APP</Title>
            <Menu>
                {menu}
            </Menu>
            <ErrorModal
                mainMessage={'Error'}
                detailMessage={errorModalState.message}
                isOpen={errorModalState.hasError}
                onClose={errorModalState.handleClose}
            />
            <SigninModal
                title={t('ChooseSignInProvider')}
                isOpen={signinModalState.isOpen}
                onClickGoogle={signinModalState.handleGoogoleLogin}
                onCancel={signinModalState.hide}
                onBackgroundClick={signinModalState.hide} />
        </Wrapper>
    )
}

export default Header;