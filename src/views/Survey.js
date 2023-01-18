import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import {
    collection,
    getDoc,
    doc
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Survey = () => {
    const location = useLocation();
    const Email = location.state['email'];
    const Id = String(location.state['id']);
    const [Questionarray, setQuestionarray] = useState([]);
    const path = require('path');
    const image_path = path.join('https://melonps.github.io/gen_sum_graph/sorce/ex_1', String(1)+'.png')

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


    return (
        <div>
        
        <h1>実験ページ</h1>
            <p>{Email}</p>
            <p>{Id}</p>
            <p>{Questionarray}</p>

            <img src={image_path} alt="question" />
        </div>
    );
};



export default Survey;