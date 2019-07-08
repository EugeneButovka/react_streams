import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {createStream} from "../../actions";


class StreamCreate extends React.Component {
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
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`;

        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete={"off"}/>
                {/*<div>{formProps.meta.error}</div>*/}
                {this.renderError(formProps.meta)}
            </div>
        );


        //return <input {...formProps.input}/> //short form + passing other properties
        /*return <input
            type="text"
            onChange={formProps.input.onChange}
            value={formProps.input.value}
        />*/
    };

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
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
};

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'please, enter title'
    }

    if (!formValues.description) {
        errors.description = 'please, enter description'
    }

    return errors;
}

/*
export default connect()(reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate));*/

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null, {createStream})(formWrapped);
