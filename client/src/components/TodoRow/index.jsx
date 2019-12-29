import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box as CheckBox, Text } from '../Checkbox';
import { IconButton } from '../Button';
import ListItem, { SecondaryAction, PrimaryAction } from '../List/ListItem';


const Wrapper = styled(ListItem)`
`;

const TrashIcon = styled(FontAwesomeIcon)(({ iconsize }) => `
    font-size : ${iconsize};
`);

const TodoRow = ({ className, iconsize = '1rem', todo, onChange, handleJump, onDelete }) => {
    const checked = Boolean(todo.checked);
    return useMemo(() => {
        return (
            <Wrapper className={className} onClick={() => {
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
                <Text checked={checked} label={todo.name} />
                <SecondaryAction>
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        onDelete(todo);
                    }}>
                        <TrashIcon iconsize={iconsize} icon={['far', 'trash-alt']} />
                    </IconButton>
                </SecondaryAction>
            </Wrapper>
        )
    }, [todo, handleJump, iconsize, className, onChange, onDelete, checked]);
}

export default TodoRow;