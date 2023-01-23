import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import {
    collection,
    getDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//import BlockBrowserBack from '../components/BlockBrowserBack';

import '../style/survey.css';
import {  Button} from '@mui/material'


import Carousel from 'react-bootstrap/Carousel';

import s0 from '../images/c0.png'
import s1 from '../images/c1.PNG'
import s2 from '../images/c2.PNG'
import s3 from '../images/c3.PNG'
import s4 from '../images/c4.PNG'
import s5 from '../images/c5.PNG'
import test from '../images/test.mp3'

import urlJoin from 'url-join'

const Explain = () => {
    const location = useLocation();
    const Id = String(location.state['id']);
    const [Questionarray, setQuestionarray] = useState([]);

    const [index, setIndex] = useState();
    const [testListend, updatetestListend] = useState(false) //送信したら無効
    const [Started, setStarted] = useState(false)
    const navigate = useNavigate();
    const usersDocRef = doc(db, "users", Id);

    const [showidx, setshowidx] = useState([]);



    const debugurl = urlJoin('https://raw.githubusercontent.com/Melonps/gen_sum_graph/master/question_data', String(1),String(1));

    var debugaudio_path = debugurl+'.mp3'
    useEffect(() => {
        // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
        if (!location.state['confirmed']) {
            console.log("hi")
            navigate('/' ,{ replace: true });
        } 
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


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const addnext = (value) => {
        var array = [...showidx, value]
        setshowidx(array);
    }

    function testaudio() {
        document.getElementById('test_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('test_audio').play(); //クリックしたら音を再生
        updatetestListend(!testListend)
    };

    async function Surveystart() {
        if (Started)  {
            navigate('/thankyou');
        } else {
            addnext(1);
            await updateDoc(usersDocRef, {
            start: true,
            });
            setStarted(true)
            navigate('/survey', { state: { QuestionIndex: Questionarray, id: index } });
        }
        
        
    };


    function debugaudio() {      
        document.getElementById('debug_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('debug_audio').play(); //クリックしたら音を再生
    }

    return (
        <div>
            <div className='Survey-header'>
                <h1 >実験ページ</h1>
                <button className="btn btn-outline-primary" onClick={debugaudio} >音声が流れます。</button>
                <audio id="debug_audio">
                    <source src= { debugaudio_path } type="audio/mp3"/>
                </audio>
                <audio controls src={ debugaudio_path } ></audio>
            </div>
            
            <div className='aboutline'>
                <li className="about_ex">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <img src={s0} alt="aaa" />
                            <Carousel.Caption>
                            <h2>実験上の注意</h2>
                            </Carousel.Caption>
                        </Carousel.Item>
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
                            <h2>音声は一度しか流れません。</h2>
                            <p>一度で聞いてもらうよう、お願いします</p>
                            <Button variant="contained" onClick={testaudio} >音量テスト</Button>
                            <audio id="test_audio">
                                <source src={test} type="audio/mp3"/>
                            </audio>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={s3} alt="aaa" />
                            <Carousel.Caption>
                            <h2>順番通りの回答をお願いします</h2>
                            <p>
                                ご協力をお願いします。
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={s4} alt="aaa" />
                            <Carousel.Caption>
                            <h2>報酬について</h2>
                            <p>
                                全ての問題に回答して頂いた後、謝金のお支払いのための情報を入力して頂きます。
                                </p>
                            <p>回答が足りてないと報酬のお支払いができないのでご注意ください</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={s5} alt="aaa" />
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
        </div>
    );
};



export default Explain;