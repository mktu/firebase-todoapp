import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '../Checkbox';
import { IconButton } from '../Button';

const Fadein = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
    display : flex;
    align-items : center;
    &>:last-child{
        margin-left : auto;
    }
    ${css`
        animation : 0.8s ${Fadein};
    `}
`;

const CheckboxBlock = styled(Checkbox)`
    display : block;
    width : 100%;
`;
const IconButtons = styled.div`
`;

const TrashIcon = styled(FontAwesomeIcon)(({iconsize})=>`
    font-size : ${iconsize};
`);

const TodoRow = ({ className, iconsize='1rem', todo, onChange, onDelete, ...props }) => {
    const checked = Boolean(todo.checked);
    return (
        <Wrapper className={className}>
            <CheckboxBlock checked={checked} onCheck={() => {
                onChange({
                    ...todo,
                    checked: !checked,
                })
            }} label={todo.name} />
            <IconButtons>
                <IconButton onClick={onDelete}>
                    <TrashIcon iconsize={iconsize} icon={['far', 'trash-alt']} />
                </IconButton>
            </IconButtons>
        </Wrapper>
    );
}

export default TodoRow;