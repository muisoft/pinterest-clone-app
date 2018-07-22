import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Card, FontIcon, Divider } from 'react-md';

import { withMainComponent } from '../hoc';

const Signup = ({ onSignup, handleChange }) => {
    const styles = {
        input: {
            fontSize: 16
        }
    }
    return (
        <form className="login-form" onSubmit={onSignup}>
            <div className="login-form">
                <div className="signin" style={{ width: 400 }}>
                    <div>
                        <TextField
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            block paddedBlock
                            inputStyle={styles.input}
                            onChange={handleChange} />
                        <Divider />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            block paddedBlock
                            inputStyle={styles.input}
                            onChange={handleChange} />
                        <Divider />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            block paddedBlock
                            inputStyle={styles.input}
                            onChange={handleChange} />
                        <Divider />
                    </div>

                    <Button raised primary style={{ marginTop: 15 }} type="submit">Sign up</Button>
                </div>
                <div className="option-signin" style={{ marginTop: 10 }}>
                    <span style={{ paddingRight: 5 }}>Already have an account? </span>
                    <Button href="/account/login" primary> Sign in</Button>
                </div>
            </div>
        </form>
    )

}

Signup.PropTypes = {
    onSignup: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default withMainComponent(Signup);
