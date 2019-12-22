import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';
import TextInput from '../Input';
import Paper from '../Paper';

const Wrapper = styled(Paper)`
    transition-duration: 1s;
    &>:last-child{
        margin-left : auto;
    }

    ${({ theme, hasTodo }) => `
        background-color : ${theme.surface};
        ${hasTodo ? `
            width : 500px;
        ` : `
            padding : 0;
            width : 0px;
        `}
    `}
`;

const TitleInput = styled(TextInput).attrs({
    variant: 'contained'
})`
    & > input {
        font-size : 1.5rem;
    }
    & > label{
        font-size : 1rem;
    }
`;

const Detail = styled(TextInput).attrs({
    variant: 'multiline',
    minRows : 5,
    maxRows : 10
})`
    margin-top : 1rem;
    & > textarea {
        font-size : 1.5rem;
    }
    & > label{
        font-size : 1rem;
    }
`;

const TodoDetail = ({ className, todo, onChange }) => {
    const theme = useContext(ThemeContext);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    useEffect(() => {
        if(todo){
            const {name='',detail=''} = todo;
            setTitle(name);
            setDetail(detail);
        }
    }, [todo])
    return (
        <Wrapper className={className} theme={theme} hasTodo={Boolean(todo)}>
            {todo && (
                <div>
                    <TitleInput
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        label='Title'
                        value={title}
                        onBlur={() => {
                            todo.name !== title &&
                                onChange({
                                    ...todo,
                                    name: title
                                })
                        }}
                    />
                    <Detail
                        onChange={(e) => {
                            setDetail(e.target.value)
                        }}
                        label='Detail'
                        value={detail}
                        onBlur={() => {
                            todo.detail !== detail &&
                                onChange({
                                    ...todo,
                                    detail: detail
                                })
                        }}
                    />
                </div>

            )}
        </Wrapper>
    );
}

export default TodoDetail;