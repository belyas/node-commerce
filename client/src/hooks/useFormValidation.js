import { useState, useEffect } from 'react';

function useFormValidation(initialState, validate, successFunc, redirector) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const checkSubmission = async () => {
                const noErrors = Object.keys(errors).length === 0;

                if (noErrors) {
                    try {
                        let hasLoggedIn = await successFunc(values);
                        console.log(`Is success login: ${hasLoggedIn}`);

                        if (hasLoggedIn) {
                            redirector.push('/');
                        }
                    } catch (err) {
                        console.log(`Is success login: ${err.message}`);
                    }
                } else {
                    setSubmitting(false);
                }
            };
            
            checkSubmission();
        }
        // eslint-disable-next-line
    }, [errors]);

    const onChangeHandler = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const onBlurHandler = () => {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    };

    const onSubmitHanlder = event => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    };

    return {
        onSubmitHanlder,
        onChangeHandler,
        onBlurHandler,
        values,
        errors,
        isSubmitting,
    };
}

export default useFormValidation;
