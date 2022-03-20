import { useRef, useEffect } from 'react';

export const getCharacterId = (value) =>
    value
        .split('/')
        .filter((i) => i)
        .pop();

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
