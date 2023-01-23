import React, { useState } from 'react';
import { Button, FormControl, RadioGroup,Radio,FormLabel, FormControlLabel} from "@mui/material";
import urlJoin from 'url-join'

const Question = (props) => {
    const [Listend, updateListend] = useState(false); //送信したら無効
    const [Finished, updateFinished] = useState(false); //送信したら無効
    const [value, setValue] = useState();
    const seed = props.id
    const idtest = String(props.q_id)
    //console.log(seed)
    //console.log(idtest)
    const url = urlJoin('https://raw.githubusercontent.com/Melonps/gen_sum_graph/master/question_data', seed, idtest);
    var audio_path = url + '.mp3'
    var image_path = url + '.png'

    console.log(audio_path)

    const handleChange = event => {
    // クリックされたら、valueの値をsetします。
        console.log(event.target.value);
        setValue(event.target.value);
        
    };

    function submit() {
        props.addans(value);
        props.addnext(1);
        updateFinished(!Finished)
    } 


    //画像のパス設定
    //var image_path = url+'.png'
    //console.log(image_path)
    //console.log(props.q_id)
    //var audio_path = url+'.mp3'

    function audio() {      
        document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_audio').play(); //クリックしたら音を再生
        updateListend(!Listend)
    }
    

    return (
        <div class="outline">
            <h1>質問{String(props.idx+1)}</h1>
            <button className="btn btn-outline-primary" onClick={audio} disabled={Listend}>音声が流れます。</button>
            <audio id="btn_audio">
                <source src={ audio_path } type="audio/mp3"/>
            </audio>
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
                        onChange={handleChange}
                    >
                        
                        <FormControlLabel value="1" name="radiobox" control={<Radio />} label="1" />
                        <FormControlLabel value="2" name="radiobox" control={<Radio />} label="2" />
                        <FormControlLabel value="3" name="radiobox" control={<Radio />} label="3" />
                        <FormControlLabel value="4" name="radiobox" control={<Radio />} label="4" />
                        <FormControlLabel value="5" name="radiobox" control={<Radio />} label="分からない" />
                        <Button variant="contained" onClick={submit} disabled = {Finished}> 回答 </Button>
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
    
};

export default Question;