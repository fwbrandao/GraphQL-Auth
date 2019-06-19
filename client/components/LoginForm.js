import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import { hashHistory } from 'react-router';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }

    //WARNING! componentWillUpdate To be deprecated in React v17. Use componentDidUpdate instead.
    componentDidUpdate(prevProps) {
        // this.props // the old, current set of props
        // nextProps // the next set of props that will be in place
        // when the component rerenders
        if (!prevProps.data.user && this.props.data.user) {
            // redirect to dashboard!!
            hashHistory.push('/dashboard');
        }
        console.log(prevProps, this.props);
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm
                errors={this.state.errors}
                onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);