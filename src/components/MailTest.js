import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";


function MailTest() {
    const [Email, setEmail] = useState("");
    const [Error, setError] = useState("ttt");

    const handleChange = event => {
    // クリックされたら、valueの値をsetします。
        console.log(event.target.value);
        setEmail(event.target.value);
    };


    async function PostTest() {
        try {
            const response = await fetch('https://vfs4zsu7n4g3tozhlb66gykjaq0owlkx.lambda-url.ap-northeast-1.on.aws/', {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Email)
            });
            console.log("ここまでok1")
            console.log(response);

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
                return json_data ;
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
            console.log(responseData);
        } else {
            setError("適切なデータがありません");
        }
    }

    return (
        <>
            <Button onClick={sendMail}>test</Button>
            <TextField
                onChange={handleChange}
            ></TextField>
            <p>{Email}</p>
            <p>{Error}</p>
        </>
    )
}

export default MailTest;