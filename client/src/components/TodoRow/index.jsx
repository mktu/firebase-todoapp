import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box as CheckBox, Text } from '../Checkbox';
import { IconButton } from '../Button';
import ListItem, { SecondaryAction, PrimaryAction } from '../List/ListItem';
import {useTodoRowState} from '../../hooks';

const Wrapper = styled(ListItem)`
`;

const CustomIcon = styled(FontAwesomeIcon)(({ iconsize }) => `
    font-size : ${iconsize};
`);

const SecondaryText = styled(Text)(({isPastDueDate})=>`
    font-size : 1rem;
    margin-top : 0.3rem;
    ${isPastDueDate && `
        color : red;
    `}
`);

const TodoRow = ({ className, iconsize = '1rem', todo, onChange, handleJump, onDelete }) => {
    const {checked, handleClickItem, handleCheck, isPastDueDate, handleDelete,dueDateStr } = useTodoRowState({todo,handleJump,onChange,onDelete});
    return useMemo(() => {
        return (
            <Wrapper className={className} onClick={handleClickItem}>
                <PrimaryAction>
                    <CheckBox checked={checked} onCheck={handleCheck} />
                </PrimaryAction>
                <div>
                    <Text checked={checked} strikethrough>{todo.name}</Text>
                    {dueDateStr && (
                        <SecondaryText isPastDueDate={isPastDueDate} checked={checked} strikethrough >
                        <CustomIcon icon={['far', 'clock']}/> {dueDateStr}
                        </SecondaryText>)}
                </div>
                <SecondaryAction>
                    <IconButton onClick={handleDelete}>
                        <CustomIcon iconsize={iconsize} icon={['far', 'trash-alt']} />
                    </IconButton>
                </SecondaryAction>
            </Wrapper>
        )
    }, [checked, className, handleClickItem, handleCheck, isPastDueDate, handleDelete, dueDateStr, todo.name, iconsize]);
}

export default TodoRow;