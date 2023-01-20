import React, { useState } from 'react';
import { db } from "../firebase";
import {
    setDoc,
    collection,
    doc,
    serverTimestamp,
    getCountFromServer,
    updateDoc,
    getDoc
} from "firebase/firestore";
import { Box, TextField, Button, FormControlLabel, FormGroup, Checkbox } from '@mui/material'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

const Start = () => {
    const [Email, setEmail] = useState("");
    const [Error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(true)
    const [passError, setPassError] = useState(true)
    const auth = getAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    async function judge() {
        const signuserRef = doc(db, "signin", Email);
        
        await getDoc(signuserRef).then((documentSnapshot) => {
            if (documentSnapshot.exists()) {
                console.log('Document data:', documentSnapshot.data());
                const text = "メールアドレス" + documentSnapshot.data().email + "は既に登録されているようです";
                setError(text)
            } else {
                console.log('No such document!');
                signInWithPopup(auth, provider)
                setDoc(signuserRef, {
                    email: Email,
                    timestamp: serverTimestamp()
                });
                addmail()
            }
        });

        
        
    };
    async function addmail() {
        const signindata = collection(db, "signin");
                
        const snapshot = await getCountFromServer(signindata)
        console.log(snapshot.data().count+1)
        const Index = snapshot.data().count+1

        const usersDocRef = doc(db, "users", String(Index));

        await updateDoc(usersDocRef, {
            email: Email,
            read: true
        });
                    
        navigate('/survey', {state: {email:Email ,id:Index}});
    };

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }
    const handleBlur = (e) => {
        const pass = e.target.value
        if (!pass) {
            setPassError('メールアドレスを入力してください')
        } else if (pass.length < 1) {   
            setPassError('メールアドレスを入力してください')
        } else {
            setPassError()
        }
    }



    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="研究に協力することを承諾します。" onChange={() => toggleCheckbox()}/>
            </FormGroup>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="メールアドレス" variant="standard" onBlur={handleBlur}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                <Button variant="contained" onClick={judge} disabled = {isChecked}>実験開始 </Button>
            </Box>
            {passError && <p>{passError}</p>}
            <p>{Error}</p>
        </>
    );
};



export default Start;