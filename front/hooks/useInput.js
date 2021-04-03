import { useState, useCallback } from 'react';

const useInput = (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback(({target}) => {
        setValue(target.value);
    }, []);

    return [value, handler, setValue];
};

export default useInput;