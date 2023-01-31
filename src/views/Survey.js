import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import {
    doc,
    updateDoc
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Question from '../components/Question';
import Example from '../components/example';
import { useNavigate } from 'react-router-dom';
//import BlockBrowserBack from '../components/BlockBrowserBack';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import '../style/survey.css';
import { Box, Stack, TextField, Button, Container } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Carousel from 'react-bootstrap/Carousel';


import s0 from '../images/c0.PNG'
import s1 from '../images/c1.PNG'
import s2 from '../images/c2.PNG'
import s3 from '../images/c3.PNG'
import s4 from '../images/c4.PNG'
import s5 from '../images/c5.PNG'
import test from '../images/test.mp3'

const Survey = () => {
    const location = useLocation();
    const Id = String(location.state['id']);
    const Questionarray = location.state['QuestionIdx']
    //console.log(Questionarray)

    const [index, setIndex] = useState();
    const [testListend, updatetestListend] = useState(false); //送信したら無効
    const [Started, setStarted] = useState(false);
    const [Ended, setEnded] = useState(false);

    const navigate = useNavigate();
    
    const [ans, setans] = useState([]);
    const [reason, setreason] = useState([]);
    const [showidx, setshowidx] = useState([]);
    const [time, settime] = useState([]);

    const [name, setname] = useState([]);
    const [address, setaddress] = useState();


    useEffect(() => {
        // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
        if (!location.state['confirmed']) {
            console.log("hi")
            navigate('/' ,{ replace: true });
        } 
        window.scrollTo(0, 0)

        if (Started)  {
            navigate('/thankyou');
        }
        
    }, []);

    const addans = (value) => {
        var newans = [...ans, value];
        setans(newans);
    };

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const addnext = (value) => {
        var array = [...showidx, value]
        setshowidx(array);
    }

    const addreason= (value) => {
        var array = [...reason, value]
        setreason(array);
    }

    const addtime= (value) => {
        var newtime = [...time, value]
        settime(newtime);
    }

    

    function testaudio() {
        document.getElementById('test_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('test_audio').play(); //クリックしたら音を再生
        updatetestListend(!testListend)
    };

    async function Surveystart() {
        if (Started && Ended)  {
            navigate('/thankyou');
        } else {
            addnext(1);
            window.scrollTo({
                top: 1200, behavior: 'smooth'
            })
            var usersDocRef = doc(db, "users", Id);
            await updateDoc(usersDocRef, {
            start: true,
            });
            setStarted(true)

        }
        
        
    };

    async function Surveyend() {
        var usersDocRef = doc(db, "users", Id);
        await updateDoc(usersDocRef, {
            answer: ans,
            end: true,
            name: name,
            address: address,
            reason: reason,
            time: time,
        });
        setEnded(true)
        navigate('/thankyou')
    };



    return (
        <div>
            <div className='Survey-header'>
                <h1 >実験ページ</h1>
                <div className='annotation'>
                    <p>下の実験上の注意をお読みください<br/>実験開始ボタンから始めれます</p>
                </div>
            </div>
            
            <div className='aboutline'>
                <li className="about_ex">
                    <Carousel activeIndex={index} variant="dark"  onSelect={handleSelect}>
                        <Carousel.Item >
                            <img className='inCarousel' src={s0} alt="aaa" />
                            <Carousel.Caption>
                            <h2>実験上の注意</h2>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img className='inCarousel' src={s1} alt="aaa" />
                            <Carousel.Caption>
                            <h2>ブラウザバックやリロードをしないでください</h2>
                                <p>データの重複を防止するためです。<br />
                                報酬のための情報が届かなくなります。
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img className='inCarousel' src={s2} alt="aaa" />

                            <Carousel.Caption>
                            <h2>音声は一度しか流れません。</h2>
                            <p>下のボタンで音声が流れるかのテストをしてから開始してください</p>
                            <Button variant="contained" onClick={testaudio} >音声テスト</Button>
                            <audio id="test_audio">
                                <source src={test} type="audio/mp3"/>
                            </audio>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='inCarousel' src={s3} alt="aaa" />
                            <Carousel.Caption>
                            <h2>順番通りの回答をお願いします</h2>
                            <p>
                                ご協力をお願いします。
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img className='inCarousel' src={s4} alt="aaa" />
                            <Carousel.Caption>
                            <h2>報酬について</h2>
                            <p>
                                全ての問題に回答して頂いた後、謝金のお支払いのための情報を入力して頂きます。
                                </p>
                            <p>回答が足りてないと報酬のお支払いができないのでご注意ください</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img className='inCarousel' src={s5} alt="aaa" />
                            <Carousel.Caption>
                            <h2>ご協力ありがとうございます</h2>
                            <p>
                                下のボタンから実験を始めてください。
                                </p>
                            <Button variant="contained" onClick={Surveystart} >実験を開始する</Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                </li>
            </div>

            <div style={{ visibility: Started ? "visible" : "hidden" }}>
                
                <div style={{ visibility: showidx[0] ? "visible" : "hidden" }}>
                    <Example></Example>
                    <Question addnext={addnext} addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[0]} idx={ 0 } id={ Id } />
                    
                </div>
                
                <div style={{ visibility: showidx[1] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[1]} idx={ 1 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[2] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[2]} idx={ 2 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[3] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[3]} idx={ 3 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[4] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[4]} idx={ 4 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[5] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[5]} idx={ 5 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[6] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[6]} idx={ 6 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[7] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[7]} idx={ 7 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[8] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[8]} idx={ 8 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[9] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[9]} idx={ 9 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[10] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[10]} idx={ 10 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[11] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[11]} idx={ 11 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[12] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[12]} idx={ 12 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[13] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[13]} idx={ 13 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[14] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[14]} idx={ 14 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[15] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[15]} idx={ 15 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[16] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[16]} idx={ 16 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[17] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[17]} idx={ 17 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[18] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[18]} idx={ 18 } id={ Id } />
                </div>
                <div style={{ visibility: showidx[19] ? "visible" : "hidden" }}>
                    <Question addnext={ addnext } addans={addans} addreason={ addreason } addtime={ addtime } q_id={Questionarray[19]} idx={ 19 } id={ Id } />
                </div>

                <div style={{ visibility: showidx[20] ? "visible" : "hidden" }}>
                    <div className='next'>
                        <Container maxWidth="md" sx={{ pt: 5 }}>
                            <h3>謝金の支払いに必要な個人情報の入力</h3>
                            <p>ここで入力していただく情報は謝金のお支払いのために用い、実験には使用しません。
                                氏名、住所を正しく記載していただけない場合は、謝金のお支払いができませんので、ご注意ください。</p>
                            <Stack spacing={3}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <DriveFileRenameOutlineIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField required label="お名前" variant="standard" onChange={(e) => {
                                        setname(e.target.value)
                                    }}/>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField required label="住所" variant="standard" onChange={(e) => {
                                        setaddress(e.target.value)
                                    }}/>
                                </Box>
                            </Stack>
                        </Container>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="contained" onClick={Surveyend}>回答を送信する</Button>
                    </div>
                </div>
                
                
            </div>
            
        </div>
    );
};



export default Survey;