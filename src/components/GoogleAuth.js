import React from 'react'


class GoogleAuth extends React.Component {
    state = {isSignedIn: null};

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '837586672042-8o5sk835oreobmp00v74emtm8dk6cdev.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn)
            return (
                <button onClick={this.onSignOut} className={"ui blue google button"}>
                    <i className={"google icon"}></i>
                    Sign out
                </button>
            );
        else
            return (
                <button onClick={this.onSignIn} className={"ui red google button"}>
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

export default GoogleAuth;