import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '../Checkbox';
import { Fadein } from '../Animation';
import { IconButton } from '../Button';

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

const TodoRow = ({ className, iconsize='1rem', todo, onChange, handleJump, onDelete, ...props }) => {
    const checked = Boolean(todo.checked);
    return (
        <Wrapper className={className}>
            <CheckboxBlock checked={checked} onClick={()=>{
                handleJump(todo)
            }} onCheck={() => {
                onChange({
                    ...todo,
                    checked: !checked,
                })
            }} label={todo.name} />
            <IconButtons>
                <IconButton onClick={()=>{onDelete(todo)}}>
                    <TrashIcon iconsize={iconsize} icon={['far', 'trash-alt']} />
                </IconButton>
            </IconButtons>
        </Wrapper>
    );
}

export default TodoRow;