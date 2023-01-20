import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button,FormGroup} from "@mui/material";

const Signin = () => {
    const navigate= useNavigate();
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(true)
    const provider = new GoogleAuthProvider();
    const [passError, setPassError] = useState(true)
    const [pass, setPass] = useState('');
    const auth = getAuth();
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider).then((result) => {
                console.log(result);
            })
            navigate('/survey');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    const handleBlur = (e) => {
        const pass = e.target.value
        if (!pass) {
            setPassError('required')
        } else if (pass.length < 1) {
            setPassError('パスワードは4文字以上です')
        } else {
            setPassError()
        }
    }

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }



    return (
        <div>
            <h1>ログイン</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <FormGroup>
                <FormControlLabel control={<Checkbox /> } onBlur={handleBlur} label="同意します。" onChange={() => toggleCheckbox() ,(e) => {
            setPass(e.target.value)
         }/>
            </FormGroup>

            <Button variant="contained" onClick={handleLogin} disabled = { passError || isChecked}>ログインして実験を始める </Button>
            {passError && <p>{passError}</p>}
        </div>
    );
};

export default Signin;