import React, { useContext,forwardRef } from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts';
import TextInput from '../Input';
import Paper from '../Paper';
import {useTodoDetailState} from '../../hooks';

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
    minRows: 5,
    maxRows: 10
})`
    margin-top : 1rem;
    & > textarea {
        font-size : 1.5rem;
    }
    & > label{
        font-size : 1rem;
    }
`;

const DateWrapper = styled.div`
    margin-top : 1rem;
    display : flex;
    align-items : center;
`;

const DateTextInput = styled(TextInput).attrs({
    variant: 'contained',
})`
    width : 100%;
    
    & > input {
        font-size : 1.2rem;
    }
`;

const DateCustomInput = forwardRef((props, _ref) =>{
    return <DateTextInput ref={_ref} {...props}/>
});

const TodoDetail = ({ className, todo, onChange }) => {
    const theme = useContext(ThemeContext);
    const {t} = useTranslation();
    const {
        title,
        handleTitleInputChange,
        handleTitleInputBlur,
        detail,
        handleDetailInputChange,
        handleDetailInputBlur,
        dueDate,
        handleChangeDueDate
    } = useTodoDetailState({todo,onChange});
    return (
        <Wrapper className={className} theme={theme} hasTodo={Boolean(todo)}>
            {todo && (
                <div>
                    <TitleInput
                        onChange={handleTitleInputChange}
                        label={t('Title')}
                        value={title}
                        onBlur={handleTitleInputBlur}
                    />
                    <DateWrapper>
                        <DatePicker
                            selected={dueDate}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy/MM/dd-h:mm aa"
                            isClearable
                            customInput={<DateCustomInput label={t('DueDate')} />}
                            onChange={handleChangeDueDate} />
                    </DateWrapper>

                    <Detail
                        onChange={handleDetailInputChange}
                        label={t('Detail')}
                        value={detail}
                        onBlur={handleDetailInputBlur}
                    />
                </div>

            )}
        </Wrapper>
    );
}

export default TodoDetail;