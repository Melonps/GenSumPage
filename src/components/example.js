import React, { useState } from 'react';
import { Button,  FormControl, RadioGroup,Radio,FormLabel, FormControlLabel} from "@mui/material";

import useSound from 'use-sound';

import example_image from '../images/example_image.png'
import example_audio from '../images/example_audio.mp3'
import '../style/example.css';

const Example = () => {
    const [Finished, updateFinished] = useState(false); //送信したら無効
    const [value, setValue] = useState("");


    const [play, {stop}] = useSound(example_audio);



    const handleChange = event => {
    // クリックされたら、valueの値をsetします。
        console.log(event.target.value);
        setValue(event.target.value);
    };

    
    function submit() {
        stop();
        updateFinished(true)
    }



    function audio2() {   
        stop();
        play(); //クリックしたら音を再生
        
    }




    return (
        <div class="outline">
            <h1>例題</h1>
            <button className="btn btn-outline-primary" onClick={audio2}>クリックすると音声が流れます。</button>

            <div class="box_image">
                <img src={ example_image } alt="question" class="imageQuestion"/>
            </div>
            <div class="form">
                <FormControl>
                    <FormLabel>例題選んでください</FormLabel>
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
                </FormControl>
            </div>
            <div class="explain">
                <p>説明文</p>
                <FormLabel>これから説明するグラフは都道府県別の自動車盗難件数に関するもので、件数の大きい順に並んでいます.<br/>
                1位の都道府県から7位の都道府県までを3グループに分割し、1位から4位グループ、5位、6から7位グループとします.<br/>
                5位の件数は1位から4位グループの7割程度です.<br/>
                6から7位グループの件数は6位が5位の7割程度で、グループ内では急な傾斜があります.</FormLabel>
            </div>
            <FormLabel>今回の答え：<span class="explain">1</span></FormLabel>
        </div>
    );
    
};

export default Example;