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
import { Box,  TextField, Button, FormControlLabel, FormGroup, Checkbox, FormLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Loading from './Loading';
import '../style/start.css';

const Start = () => {
    const [Email, setEmail] = useState("");
    const [Error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(true)
    const [isChecked2, setIsChecked2] = useState(true)
    const [isChecked3, setIsChecked3] = useState(true)
    const [isChecked4, setIsChecked4] = useState(true)
    const [responsedText, setresponsedText] = useState("")
    const [passError, setPassError] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    
    var pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    const pass_pattern = 158;

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

    const handleBlur2 = (e) => {
        const pass = e.target.value
        if (!pass) {
            setPassError('パスワードを入力してください')
        } else if (pass === pass_pattern) {   
            setPassError('パスワードにマッチしていません')
        } else {
            setPassError()
            setIsChecked4(!isChecked4)
        }
    }

    async function PostTest() {
        try {
            const response = await fetch('https://yaryitroa7m77ur24vsegsb6ki0octnv.lambda-url.ap-northeast-1.on.aws/', {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Email)
            });
            console.log("ここまでok1")
            console.log(response)
            if (!response.ok) {
                console.log("ここまでok2")
                console.error('response.ok:', response.ok);
                console.error('esponse.status:', response.status);
                console.error('esponse.statusText:', response.statusText);
                setError("サーバーエラー");
                
            } else {
                console.log("ここまでok2.5")
                const json_data = await response.text();
                console.log(json_data);
                console.log("ここまでok3")
                return json_data;
            }
            
        } catch (e) {
            console.error(e);
            console.log("ここまでok4")
            setError("サーバーエラー");
        }
    }

    async function sendMail() {
        const responseData = await PostTest();
        if (responseData) {
            setresponsedText("メールを送信しました．")
            console.log(responseData);
        } else {
            setError("適切なデータがありません．\nメールアドレスが有効なものかお確かめください．");
        }
    }



    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="研究に協力することを承諾します。" onChange={() => toggleCheckbox()}/>
                <FormControlLabel control={<Checkbox />} label="このページをPCで、かつ全画面で表示しています。" onChange={() => toggleCheckbox2()}/>
            </FormGroup>
            <FormLabel>メールアドレスを入力してください．<br/>パスワードが送られます</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="メールアドレス" variant="standard" onBlur={handleBlur} type="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                <Button variant="contained" onClick={sendMail} disabled = {isChecked || isChecked2 || isChecked3 }>メール送信 </Button>
                
            </Box>
            <Box sx={{ p: 1 }} >
                <FormLabel>{ responsedText }</FormLabel>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                
                <LockOpenIcon   sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="password" variant="standard" onBlur={handleBlur2} type="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />

            </Box>
            
            
            <Box sx={{ p: 4 }} >
                <Button variant="contained" width="full" onClick={judge} disabled = { isChecked || isChecked2 || isChecked3 || isChecked4 }>実験開始 </Button>
            </Box>
            
            
            {passError && <p>{passError}</p>}
            <p>{Error}</p>
            { isLoading ? <Loading /> : <br/> }
        </>
    );
};



export default Start;