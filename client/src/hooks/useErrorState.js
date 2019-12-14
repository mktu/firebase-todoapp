import { useState } from 'react';

export default function(){
    const [error, setError] = useState(null);
    return {
        error,
        setError,
        hasError : Boolean(error),
        refresh : ()=>{setError(null)}
    };
}