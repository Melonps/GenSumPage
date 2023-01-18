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
import { Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

const Start = () => {
    const [Email, setEmail] = useState("");
    const [Error, setError] = useState("");
    const navigate= useNavigate();

    async function judge() {

        
        const signuserRef = doc(db, "signin", Email);

        await getDoc(signuserRef).then((documentSnapshot) => {
            if (documentSnapshot.exists()) {
                console.log('Document data:', documentSnapshot.data());
                const text = "メールアドレス" + documentSnapshot.data().email + "は既に登録されているようです";
                setError(text)
            } else {
                console.log('No such document!');
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
        console.log(snapshot.data().count)
        const Index = snapshot.data().count

        const usersDocRef = doc(db, "users", String(Index));

        await updateDoc(usersDocRef, {
            email: Email,
            read: true
        });
                    
        navigate('/survey', {state: {email:Email ,id:Index}});
    };




    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="With sx" variant="standard"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                <Button variant="contained" onClick={judge}>実験開始 </Button>
            </Box>
            <p>{ Error }</p>
        </>
    );
};



export default Start;