import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ContainedButton } from '../Button';
import { SigninModal } from '../Modal';
import { ErrorModal } from '../Modal';
import { useVisitorState } from '../../hooks';
import PaperBase from '../Paper';
import sample from '../../images/sample.png'

const Wrapper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
`;

const ImageWrapper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    padding : 1rem;
`;

const ButtonWrapper = styled.div`
    display : flex;
    justify-content : center;
`;

const Paper = styled(PaperBase)`
    padding : 2rem;
`;

const ActionButton = styled(ContainedButton).attrs({
    variant: 'secondary'
})`
    display : block;
    height : 50px;
    font-size : 1.2rem;
    margin-right : 1rem;
`;

const VisitorPage = ({ className, ...props }) => {
    const { t } = useTranslation();
    const { signinModalState, errorModalState } = useVisitorState();
    return (
        <Wrapper className={className}>
            <Paper>
                <p>{t('HeadMessage')}</p>
                <ul>
                    <li>{t('AppFeature1')}</li>
                    <li>{t('AppFeature2')}</li>
                </ul>
                <ImageWrapper>
                    <img src={sample} width='500px' alt='sample' />
                </ImageWrapper>
                <ButtonWrapper>
                    <ActionButton onClick={signinModalState.handleAnonymousLogin}>
                        {t('StartWithAnonymous')}
                    </ActionButton>
                    <ActionButton onClick={signinModalState.show}>
                        {t('StartWithSignUp')}
                    </ActionButton>
                </ButtonWrapper>
            </Paper>
            <ErrorModal
                mainMessage={'Error'}
                detailMessage={errorModalState.message}
                isOpen={errorModalState.isOpen}
                onClose={errorModalState.handleClose}
            />
            <SigninModal
                title={t('ChooseSignInProvider')}
                isOpen={signinModalState.isOpen}
                onCancel={signinModalState.hide}
                onClickGoogle={signinModalState.handleGoogoleLogin}
                onBackgroundClick={signinModalState.hide} />
        </Wrapper>
    )
}

export default VisitorPage;