import React, { useState} from 'react';
import {InputLabel, Select, Button, MenuItem, FormControl, RadioGroup,Radio,FormLabel, FormControlLabel, FormGroup} from "@mui/material";
import urlJoin from 'url-join'
import useSound from 'use-sound';

const Question = (props) => {
    const [Listend, updateListend] = useState(false); //送信したら無効
    const [Finished, updateFinished] = useState(false); //送信したら無効
    const [helperText, setHelperText] = useState(""); //送信したら無効
    
    const [value, setValue] = useState("");
    const [reason, setreason] = useState("");

    const [startTime, setstartTime] = useState();
    const seed = props.id
    const idtest = String(props.q_id)
    //console.log(seed)
    //console.log(idtest)
    var url = urlJoin('https://raw.githubusercontent.com/Melonps/gen_sum_data/master/question_data', seed, idtest);
    var audio_path = url + '.mp3'
    var image_path = url + '.png'
    const audio = new Audio(audio_path);
    const [play, { stop }] = useSound(audio_path);
    //console.log(audio_path)


    const handleChange = event => {
    // クリックされたら、valueの値をsetします。
        console.log(event.target.value);
        setValue(event.target.value);
    };

    function submit() {
        if (value) {
            const endTime = performance.now();
            props.addans(value);
            props.addreason(reason);
            props.addnext(1);
            console.log(endTime - startTime);
            props.addtime(endTime - startTime);
            updateFinished(true);
            console.log(audio);
            stop();
        } else {
            setHelperText('Please select an option.');
        }
        
    } 

    //画像のパス設定
    //var image_path = url+'.png'
    //console.log(image_path)
    //console.log(props.q_id)
    //var audio_path = url+'.mp3'

    function audio2() {   
        console.log(audio)
        play(); //クリックしたら音を再生
        updateListend(true)
        setstartTime(performance.now());
        
    }
    const handleChange2 = (e) => {
        const pass = e.target.value
        setreason(pass);

    };
    


    return (
        <div class="outline">
            <h1>質問{String(props.idx+1)}</h1>
            <button className="btn btn-outline-primary" onClick={audio2} disabled={Listend}>クリックすると音声が流れます。</button>

            <div class="box_image">
                <img src={ image_path } alt="question" class="imageQuestion"/>
            </div>
            <div class="form">
                <FormControl>
                    <FormLabel>質問 {String(props.idx+1)} 選んでください</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={value}
                        defaultValue="5"
                        onChange={handleChange}
                    >
                            <FormControlLabel value="1" name="radiobox" control={<Radio />} label="1" />
                            <FormControlLabel value="2" name="radiobox" control={<Radio />} label="2" />
                            <FormControlLabel value="3" name="radiobox" control={<Radio />} label="3" />
                            <FormControlLabel value="4" name="radiobox" control={<Radio />} label="4" />
                            <FormControlLabel value="5" name="radiobox" control={<Radio />} label="分からない" />
                            
                        <Button variant="contained" onClick={submit} disabled={Finished}> 回答 </Button>
                    </RadioGroup>
                    <FormLabel>{helperText}</FormLabel>
                </FormControl>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">理由を選択してください</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reason}
                        label="Age"
                        onChange={handleChange2}
                    >
                        <MenuItem value={1}>音声が聞き取れなかった．</MenuItem>
                        <MenuItem value={2}>グループの分け方が分からなかった．</MenuItem>
                        <MenuItem value={3}>理解が出来なかった．</MenuItem>
                    </Select>
                </FormControl>
                </div>
        </div>
    );
    
};

export default Question;