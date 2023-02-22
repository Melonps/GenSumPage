import React, { useState } from 'react';
import { db } from "../firebase/firebase";
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
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import Loading from './Loading';

const Start = () => {
    const [Email, setEmail] = useState("");
    const [Error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(true)
    const [isChecked2, setIsChecked2] = useState(true)
    const [isChecked3, setIsChecked3] = useState(true)
    const [passError, setPassError] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    
    var pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

    const navigate = useNavigate();

    async function judge() {
        setIsLoading(true);
        
        const signindata = collection(db, "signin"); 
        const snapshot = await getCountFromServer(signindata);
        console.log(snapshot.data().count + 1);
        const Index = snapshot.data().count + 1;
        const signuserRef = doc(db, "signin", Email);
        await getDoc(signuserRef).then((documentSnapshot) => {
            if (documentSnapshot.exists()) {
                setIsLoading(false);
                console.log('Document data:', documentSnapshot.data());
                const text = "メールアドレス" + documentSnapshot.data().email + "は既に登録されているようです";
                setError(text)
            } else {
                
                console.log('No such document!');
                setDoc(signuserRef, {
                    email: Email,
                    timestamp: serverTimestamp()
                });
                
                sendData(Index, Email);

            }
        });
    };
    async function sendData(Index, Email) {
            const userdata = (collection(db, "users"));
            const usersDocRefId = doc(userdata, String(Index));
            const usersDocId = await getDoc(usersDocRefId);
            //const usersDataId = usersDocId.data();

            console.log(usersDocId.data().QuestionIdx)

        
            const signuserRef = doc(db, "signin", Email);
            await updateDoc(signuserRef, {
                read: true
            });
            setIsLoading(false);
            navigate('/survey', {state: {confirmed:true ,email:Email, id:Index, QuestionIdx: usersDocId.data().QuestionIdx}});
    }

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }
    const toggleCheckbox2 = () => {
        setIsChecked2(!isChecked2)
    }
    
    const handleBlur = (e) => {
        const pass = e.target.value
        if (!pass) {
            setPassError('メールアドレスを入力してください')
        } else if (!pattern.test(pass)) {   
            setPassError('メールアドレスにマッチしていません')
        } else {
            setPassError()
            setIsChecked3(!isChecked3)
        }
    }



    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="研究に協力することを承諾します。" onChange={() => toggleCheckbox()}/>
                <FormControlLabel control={<Checkbox />} label="このページをPCで、かつ全画面で表示しています。" onChange={() => toggleCheckbox2()}/>
            </FormGroup>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="メールアドレス" variant="standard" onBlur={handleBlur} type="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                <Button variant="contained" onClick={judge} disabled = {isChecked || isChecked2 || isChecked3 }>実験開始 </Button>
                
            </Box>
            
            {passError && <p>{passError}</p>}
            <p>{Error}</p>
            { isLoading ? <Loading /> : <br/> }
        </>
    );
};



export default Start;