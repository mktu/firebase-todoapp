import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box as CheckBox, Text } from '../Checkbox';
import { Fadein } from '../Animation';
import { IconButton } from '../Button';
import ListItem, { SecondaryAction, PrimaryAction } from '../List/ListItem';

const fadein = css`
animation : 0.8s ${Fadein};
`;

const Wrapper = styled(ListItem)`
    ${fadein};
`;


const TrashIcon = styled(FontAwesomeIcon)(({ iconsize }) => `
    font-size : ${iconsize};
`);

const TodoRow = ({ className, listProps, iconsize = '1rem', todo, onChange, handleJump, onDelete }) => {
    const checked = Boolean(todo.checked);
    return (
        <Wrapper {...listProps} className={className} onClick={() => {
            handleJump(todo)
        }} >
            <PrimaryAction>
                <CheckBox checked={checked} onCheck={(e) => {
                    onChange({
                        ...todo,
                        checked: !checked,
                    });
                }} />
            </PrimaryAction>
            <Text checked={checked} label={todo.name}/>
            <SecondaryAction>
                <IconButton onClick={(e) => {
                    e.stopPropagation();
                    onDelete(todo);
                }}>
                    <TrashIcon iconsize={iconsize} icon={['far', 'trash-alt']} />
                </IconButton>
            </SecondaryAction>
        </Wrapper>
    );
}

export default TodoRow;