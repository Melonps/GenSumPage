import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button,FormGroup} from "@mui/material";

const Signin = () => {
    const navigate= useNavigate();
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(true)
    const provider = new GoogleAuthProvider();
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

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div>
            <h1>ログイン</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="同意します。" onChange={() => toggleCheckbox()}/>
            </FormGroup>

            <Button variant="contained" onClick={handleLogin} disabled = {isChecked}>ログインして実験を始める </Button>
        </div>
    );
};

export default Signin;