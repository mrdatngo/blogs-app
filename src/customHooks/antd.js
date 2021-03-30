import { useState, useRef, useEffect } from "react";

function useSelect(initialValue) {
    const [value, setValue] = useState(initialValue);

    const onValueChange = (value) => {
        setValue(value);
    };

    return [value, onValueChange];
}

function useInputForm(initialState) {
    const [value, setValue] = useState(initialState);

    const onValueChange = (event) => {
        setValue(event.target.value);
    };

    return [value, onValueChange];
}

const usePrevious = () => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export { useSelect, useInputForm, usePrevious };
