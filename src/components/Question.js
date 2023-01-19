import React, { useState } from 'react';
import { Button, FormControl, RadioGroup,Radio,FormLabel, FormControlLabel} from "@mui/material";
import urlJoin from 'url-join'

const Question = (props) => {
    const [Listend, updateListend] = useState(false) //送信したら無効
    const [Finished, updateFinished] = useState(false) //送信したら無効
    const [value, setValue] = React.useState();
    const url = 'https://melonps.github.io/gen_sum_graph/question_data';

    const handleChange = event => {
    // クリックされたら、valueの値をsetします。
        setValue(event.target.value);
        
    };

    function submit() {
        props.addans(value);
        updateFinished(!Finished)
    } 

    //画像のパス設定
    var image_path;
    image_path = urlJoin(url, String(props.id), String(props.q_id)+'.png')
    console.log(image_path)
    console.log(props.q_id)


    function audio() {
        document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_audio').play(); //クリックしたら音を再生
        updateListend(!Listend)
    }
    

    return (
        <div class="outline">
            <h1>質問{props.idx}</h1>
            <button className="btn btn-outline-primary" onClick={audio} disabled={Listend}>音声が流れます。</button>
            <audio id="btn_audio">
                <source src="https://raw.githubusercontent.com/ytyaru/Audio.Sample.201708031714/master/20170803/wav/CMajor.wav" type="audio/mp3"/>
            </audio>
            <div class="box_image">
                <img src={image_path} alt="question" class="imageQuestion"/>
            </div>
            
            <div class="form">
                <FormControl>
                    <FormLabel>質問 {props.q_id} 選んでください</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        
                        <FormControlLabel value="1" name="radiobox" control={<Radio />} label="1" />
                        <FormControlLabel value="2" name="radiobox" control={<Radio />} label="2" />
                        <FormControlLabel value="3" name="radiobox" control={<Radio />} label="3" />
                        <FormControlLabel value="4" name="radiobox" control={<Radio />} label="4" />
                        <FormControlLabel value="5" name="radiobox" control={<Radio />} label="分からない" />
                        <Button variant="contained" onClick={submit} disabled = {Finished}>回答 </Button>
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
    
};

export default Question;