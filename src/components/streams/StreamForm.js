import React from 'react';
import {Field, reduxForm} from 'redux-form';


class StreamForm extends React.Component {
    renderError = ({error, touched}) => {
        if (touched && error) {
            return (
                <div className={"ui error message"}>
                    <div className={"header"}>{error}</div>
                </div>
            )
        }
    };

    renderInput = (formProps) => {
        //make input field red if error
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`;

        return (
            <div className={className}>
                <label>{formProps.label}</label>
                {/*inherit all props by input, including onClick etc*/}
                <input {...formProps.input} autoComplete={"off"}/>
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={"ui form error"}>
                <Field name={"title"} component={this.renderInput} label={"Enter title"}/>
                <Field name={"description"} component={this.renderInput}  label={"Enter description"}/>
                <button className={"ui button primary"}>submit</button>
            </form>
        );
    };
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'please, enter title'
    }

    if (!formValues.description) {
        errors.description = 'please, enter description'
    }

    return errors;
};


export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
