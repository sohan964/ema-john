import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);
    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password,confirm);
        if(password.length<6){
            setError('Password should be 6 characters');
        }
        if(password !== confirm){
            setError('confirm password did not match');
        }
        
        createUser(email,password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            form.reset();
        })
        .catch(error => console.error(error));

    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="" />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>Already a user <Link to='/login'>please Login</Link></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;