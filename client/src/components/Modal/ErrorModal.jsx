import React from 'react';
import styled, { css } from 'styled-components';
import Modal from 'styled-react-modal'
import { TextButton as TextButtonBase } from '../Button';
import { Fadein } from '../Animation';

const StyledModal = Modal.styled`
    display : grid;
    width : 400px;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    background-color: white;
    font-size : 1.2rem;
    border-radius : 5px;
    ${css`
        animation : 0.8s ${Fadein};
    `}
`;

const Title = styled.div`
    padding : 1rem;
`;
const Content = styled.div`
    & > div{
        padding : 1rem;
        display : flex;
        justify-content : center;
    }
`;
const Actions = styled.div`
    display : flex;
    justify-content : flex-end;
    padding : 1rem;
`;

const TextButton = styled(TextButtonBase).attrs({
    color : 'textPrimary'
})`
    font-size : 1rem;
`;

const ErrorModal = ({ mainMessage, detailMessage,onClickGoogle, onClose, ...props }) => {
    return (
        <StyledModal {...props}>
            <Title>{mainMessage}</Title>
            <Content>
                <div>
                    {detailMessage}
                </div>
            </Content>
            <Actions>
                <TextButton onClick={onClose}>OK</TextButton>
            </Actions>
        </StyledModal>
    )
}

export default ErrorModal;