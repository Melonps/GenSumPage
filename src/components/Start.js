import React, { useState } from 'react';
import { db } from "../firebase/firebase";
import {
    collection,
    doc,
    serverTimestamp,
    getCountFromServer,
    updateDoc,
    getDoc,
    addDoc
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
    const [isSended, setIsSended] = useState(false)
    const [isChecked2, setIsChecked2] = useState(true)
    const [isChecked3, setIsChecked3] = useState(true)
    const [isChecked4, setIsChecked4] = useState(true)
    const [responsedText, setresponsedText] = useState("")
    const [password, setPassword] = useState("")
    const [passError, setPassError] = useState(true)
    const [mailError, setMailError] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [errormessage, seterrormessage] = useState();
    
    var pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

    const navigate = useNavigate();

    async function judge() {
        setIsLoading(true);
        
        const signindata = collection(db, "signin");
        const snapshot = await getCountFromServer(signindata);
        console.log(snapshot.data().count + 1);
        
        const Index = snapshot.data().count + 1;
        
        try {
            const signuserRef = await addDoc(signindata, {
                id: String(Index),
                email: Email,
                timestamp: serverTimestamp()
            });
            const newDocid = signuserRef.id
            console.log('No such document!');
            console.log(newDocid)
            
            sendData(Index, Email,newDocid);
        } catch (e) {
            seterrormessage("データの送信に失敗しました．再送信してください")
            console.error(e);
        }

        
            
    };
    

    async function sendData(Index, Email, newDocid) {  
        const userdata = (collection(db, "users"));
        const usersDocRefId = doc(userdata, String(Index));
        const usersDocId = await getDoc(usersDocRefId);
        const signuserRef = doc(db, "signin", newDocid);
        await updateDoc(signuserRef, {
            isread: true,
            newdocid: newDocid
        });
        setIsLoading(false);
        navigate('/survey', {state: {confirmed:true ,email:Email, id:Index, Docid:newDocid, QuestionIdx: usersDocId.data().QuestionIdx}});
    }

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }
    const toggleCheckbox2 = () => {
        setIsChecked2(!isChecked2)
    }
    
    const handleBlur = (e) => {
        const mail = e.target.value
        if (!mail) {
            setMailError('メールアドレスを入力してください')
        } else if (!pattern.test(mail)) {   
            setMailError('メールアドレスにマッチしていません')
            setIsChecked3(true)
        } 
        else {
            setMailError('')
        }
    }

    const handleBlur2 = (e) => {
        const pass = e.target.value
        if (!pass) {
            setPassError('パスワードを入力してください')
        } else if (pass === password) {
            
        }
        else {
            setPassError('パスワードにマッチしていません')
            setIsChecked4(true)
        }
    }

    async function PostTest() {
        setIsLoading(true);
        try {
            const response = await fetch('https://rivi4rocet2uj7sfn4o645vzuy0snggr.lambda-url.ap-northeast-1.on.aws/', {
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
                setPassword(json_data)
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
            setIsLoading(false);
            setIsSended(true);
            setresponsedText("メールを送信しました。")
            console.log(responseData);
        } else {
            setIsLoading(false);
            setError("再度ボタンを押してみてください。\nそれでも駄目なら、別のメールアドレスを使用するか、管理者に連絡してください。");
        }
    }



    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="研究に協力することを承諾します。" onChange={() => toggleCheckbox()}/>
            </FormGroup>
            <FormLabel>メールアドレスを入力して、送信ボタンを押してください。<br/>そして送られたパスワードを入力してください。</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="メールアドレス" variant="standard" onBlur={handleBlur} type="email"
                    onChange={(e) => {
                        const email = e.target.value
                        if (pattern.test(email)) {
                            setIsChecked3(false)
                        }
                        setEmail(e.target.value)
                    }} />
                <Button variant="contained" onClick={sendMail} disabled = {isChecked || isChecked3 || isSended}>メール送信 </Button>
                
            </Box>
            {mailError && <FormLabel>{mailError}</FormLabel>}
            <FormLabel>{Error}</FormLabel>
            <Box sx={{ p: 1 }} >
                <FormLabel>{ responsedText }</FormLabel>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                
                <LockOpenIcon   sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="password" variant="standard" onBlur={handleBlur2} type="password"
                    onChange={(e) => {
                        const pass = e.target.value
                        if (pass === password) {
                            setIsChecked4(false)
                        }
                    }} 
                    />
                <Button variant="contained" width="full" onClick={judge} disabled = { isChecked  || isChecked3 || isChecked4 || !isSended}>実験開始 </Button>
            </Box>
            
            
            {errormessage && <p>{errormessage}</p>}
            {passError && <FormLabel>{passError}</FormLabel>}
            { isLoading ? <Loading /> : <br/> }
        </>
    );
};



export default Start;