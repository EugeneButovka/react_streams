import React from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'


class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '837586672042-8o5sk835oreobmp00v74emtm8dk6cdev.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) //call action
            this.props.signIn(this.auth.currentUser.get().getId());
        else
            this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn)
            return (
                <button onClick={this.onSignOutClick} className={"ui blue google button"}>
                    <i className={"google icon"}></i>
                    Sign out
                </button>
            );
        else
            return (
                <button onClick={this.onSignInClick} className={"ui red google button"}>
                    <i className={"google icon"}></i>
                    Sign in with Google
                </button>
            );
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.authState.isSignedIn
    }
};

export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleAuth);