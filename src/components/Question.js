import React, { useState } from 'react';


const Question = (props) => {
    const path = require('path');
    const [Listend, updateListend] = useState(false) //送信したら無効
    const [Finished, updateFinished] = useState(false) //送信したら無効
    const elementid = 'radioBox_' + String(props.q_id)

    //画像のパス設定
    var image_path;
    image_path = path.join('https://melonps.github.io/gen_sum_graph/sorce/ex_1', String(props.q_id)+'.png')
    console.log(image_path)
    console.log(props.q_id)

    function onRadio() {
        let form = document.getElementById(elementid);
        let radioNodeList  = form.radiobox;
        if (radioNodeList.value !== '') {
            console.log(radioNodeList.value);
            props.addans(radioNodeList.value);
            updateFinished(!Finished)
        }
    }
    function audio() {
        document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_audio').play(); //クリックしたら音を再生
        updateListend(!Listend)
    }
    

    return (
        <div>
            <h1>質問{props.q_id}</h1>
            <button className="btn btn-outline-primary" onClick={audio} disabled={Listend}>音声が流れます。</button>
            <audio id="btn_audio">
                <source src="https://raw.githubusercontent.com/ytyaru/Audio.Sample.201708031714/master/20170803/wav/CMajor.wav" type="audio/mp3"/>
            </audio>

            <div class="imageQuestion">
                <img src={image_path} alt="question" />
            </div>
            
            <form class="row mb-3" id={elementid}>
                <div class="col">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radiobox" id="radio1" value="1"/>
                        <label class="form-check-label" for="radio1">1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radiobox" id="radio2" value="2"/>
                        <label class="form-check-label" for="radio2">2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radiobox" id="radio3" value="3"/>
                        <label class="form-check-label" for="radio3">3</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radiobox" id="radio4" value="4"/>
                        <label class="form-check-label" for="radio4">4</label>
                    </div>
                    <button type="button" class="btn btn-outline-info" onClick={onRadio}  disabled={Finished}>回答</button>
                </div>
            </form>
        </div>
    );
    
};

export default Question;