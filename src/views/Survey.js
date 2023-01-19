import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import {
    collection,
    getDoc,
    doc
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Question from '../components/Question';
import '../style/survey.css';
import { Button} from "@mui/material";


const Survey = () => {
    const location = useLocation();
    const Email = location.state['email'];
    const Id = String(location.state['id']);
    const [Questionarray, setQuestionarray] = useState([]);
    const [ans, setans] = useState([])

    useEffect(() => {
        // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
        const read_data = async (value) => {
            const userdata = (collection(db, "users"));
            const usersDocRefId = doc(userdata, value);
            const usersDocId = await getDoc(usersDocRefId);
            const usersDataId = usersDocId.data();

            setQuestionarray(usersDataId.QuestionIdx);
        };
        read_data(Id);
    }, []);

    const addans = (value) => {
        var newans = [...ans, value];
        setans(newans);
    };


    return (
        <div>
            <div className='App-header'>
                <h1 >実験ページ</h1>
            </div>

            <p>{Email}</p>
            <p>{Id}</p>
            <p>{Questionarray}</p>

            <Question addans={addans} q_id={Questionarray[0]} idx={ "1" } id={Id} />
            <Question addans={addans} q_id={Questionarray[1]} idx={ "2" }id={ Id } />
            <h1>{ans}</h1>
            <div class="d-grid gap-2">
                <Button variant="contained" >回答を送信する</Button>
            </div>
        </div>
    );
};



export default Survey;