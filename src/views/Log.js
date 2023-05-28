import React, { useState, useEffect, useReducer} from 'react';
//import BlockBrowserBack from '../components/BlockBrowserBack';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import '../style/survey.css';
import { Box, Stack, TextField, Button, Container ,FormLabel} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import ApprovalIcon from '@mui/icons-material/Approval';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import EmailIcon from '@mui/icons-material/Email';
import data from "../assets/answer_data.csv";


const Log = () => {
    const [Address, setAddress] = useState("");
    const [Email, setEmail] = useState("");
    const [Phonenumber, setPhonenumber] = useState("");
    const [Postcord, setPostcode] = useState("");
    const [Name, setName] = useState("");
    const [index, setIndex] = useState(1);
    const [Ansdata, setAnsdata] = useState("");
    var result = []; // 最終的な二次元配列を入れるための配列


    function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
        var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    
        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            result[i] = tmp[i].split(',');
        }
        setAnsdata(result)
    };

    function getans() {
        
        console.log("test")
        console.log(Ansdata)
        setAddress(Ansdata[index][3])
        setEmail(Ansdata[index][1])
        setPhonenumber(Ansdata[index][4])
        setName(Ansdata[index][2])
        setIndex(index+1)
    };

    useEffect(() => {
        var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
        req.open("get", data, true); // アクセスするファイルを指定
        req.send(null); // HTTPリクエストの発行
        // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
        req.onload = function(){
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
        }
    })

    return (
        <div>
            <div className='fix'>
                <Button variant="contained" endIcon={<VerticalAlignTopIcon />} sx={{ zIndex: 'tooltip' }} >
                Top
                </Button>
            </div>

            <div className='next'>
                <Container maxWidth="lg" sx={{ pt: 5 }}>
                    <h3>謝金の支払いに必要な個人情報の入力</h3>
                    <p className='cap'>ここで入力していただく情報は謝金のお支払いのために用い、実験には使用しません。<br/>
                        氏名、住所、電話番号を適切に記載していない方には謝金のお支払いができませんので、ご注意ください。{ index }/{ Ansdata.length }</p>
                    <Stack spacing={3}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth required label="メールアドレス" variant="standard" onChange={(e) => {
                                
                            }}/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <DriveFileRenameOutlineIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth required label="お名前"variant="standard" onChange={(e) => {
                                
                            }}/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth required label="住所"  variant="standard" onChange={(e) => {
                                
                            }}/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth required label="電話番号" variant="standard" onChange={(e) => {
                                
                        }} />
                        </Box> 
                        <FormLabel>ご協力ありがとうございました。本実験は一人で複数回回答してもらうこともできます。</FormLabel>
                        <Button variant="contained" onClick={() => {
                            getans();
                        }}>回答を送信する</Button>
                    </Stack>
                </Container>
            </div>
                
            
        </div>
    );
};



export default Log;