import { useState, useEffect } from 'react';
import lineHeight from 'line-height';
import useTextInputState from './useTextInputState';

const adjustRowSize = ({ target, maxRows, minRows }) => {
    const textareaLineHeight = lineHeight(target);
    const previousRows = target.rows;
    target.rows = minRows;
    const currentRows = ~~(target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
        target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
        target.rows = maxRows;
        target.scrollTop = target.scrollHeight;
    }
    return currentRows < maxRows ? currentRows : maxRows;
};

export default ({ minRows = 1, maxRows = 5, value, ...otherProps }) => {
    const [currentRows, setCurrentRows] = useState(minRows);
    const { ref, handleChange: handleChangeBase, ...other } = useTextInputState({ value, ...otherProps });

    useEffect(() => {
        // There is a bug that height can not be obtained at the first render
        const rows = adjustRowSize({ target: ref.current, maxRows, minRows });
        setCurrentRows(rows);
    }, [ref, value, maxRows, minRows]);

    const handleChange = (e) => {
        const rows = adjustRowSize({ target: e.target, maxRows, minRows });
        setCurrentRows(rows);
        handleChangeBase(e);
    };
    return { ref, currentRows, handleChange, ...other };
}