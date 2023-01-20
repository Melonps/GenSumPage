import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import {
    collection,
    getDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Question from '../components/Question';
import { useNavigate } from 'react-router-dom';
import BlockBrowserBack from '../components/BlockBrowserBack';


import '../style/survey.css';
import { Button } from "@mui/material";
import Carousel from 'react-bootstrap/Carousel';

import s1 from '../images/c1.PNG'
import s2 from '../images/c2.PNG'
import s3 from '../images/c3.PNG'
import s4 from '../images/c4.png'
import test from '../images/test.mp3'


const Survey = () => {
    const location = useLocation();
    const Email = location.state['email'];
    const Id = String(location.state['id']);
    const [Questionarray, setQuestionarray] = useState([]);
    const [ans, setans] = useState([])
    const [index, setIndex] = useState();
    const [testListend, updatetestListend] = useState(false) //送信したら無効
    const [Started, setStarted] = useState(false)
    const navigate = useNavigate();
    const usersDocRef = doc(db, "users", Id);


    useEffect(() => {
        // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
        window.scrollTo(0, 0)
        const read_data = async (value) => {
            const userdata = (collection(db, "users"));
            const usersDocRefId = doc(userdata, value);
            const usersDocId = await getDoc(usersDocRefId);
            const usersDataId = usersDocId.data();

            setQuestionarray(usersDataId.QuestionIdx);
            setStarted(usersDataId.start);

        };

        read_data(Id);
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

    function testaudio() {
        document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_audio').play(); //クリックしたら音を再生
        updatetestListend(!testListend)
    };

    async function Surveystart() {
        if (Started)  {
            navigate('/thankyou');
        } else {
            await updateDoc(usersDocRef, {
            start: true,
            });
            setStarted(true)

        }
        
        
    };

    async function Endstart() {
        await updateDoc(usersDocRef, {
            answer: ans,
            end: true
        });
        navigate('/thankyou')
    };

    return (
        <div>
            <BlockBrowserBack/>
            <div className='Survey-header'>
                <h1 >実験ページ</h1>
            </div>
            <div className='App-header'>
                <li className="about_ex">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <img src={s1} alt="aaa" />
                            <Carousel.Caption>
                            <h2>ブラウザバックやリロードをしないでください</h2>
                                <p>データの重複を防止するためです。<br />
                                報酬のための情報が届かなくなります。
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={s2} alt="aaa" />

                            <Carousel.Caption>
                            <h3>音声は一度しか流れません。</h3>
                            <p>一度で聞いてもらうよう、お願いします</p>
                            <Button variant="contained" onClick={testaudio} >音量テスト</Button>
                            <audio id="btn_audio">
                                <source src={test} type="audio/mp3"/>
                            </audio>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={s3} alt="aaa" />
                            <Carousel.Caption>
                            <h3>順番通りの回答をお願いします</h3>
                            <p>
                                ご協力をお願いします。
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={s4} alt="aaa" />
                            <Carousel.Caption>
                            <h3>ご協力ありがとうございます！</h3>
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
                <p>{Email}</p>
                <p>{Id}</p>
                <p>{Questionarray}</p>

                <Question addans={addans} q_id={Questionarray[0]} idx={ "1" } id={ Id } />
                <Question addans={addans} q_id={Questionarray[1]} idx={ "2" } id={ Id } />
                <h1>{ans}</h1>
                <div className="d-grid gap-2">
                    <Button variant="contained" onClick={Endstart}>回答を送信する</Button>
                </div>
            </div>
            
        </div>
    );
};



export default Survey;