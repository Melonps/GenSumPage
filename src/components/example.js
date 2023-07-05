import React, { useState } from "react";
import {
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormControl,
    RadioGroup,
    Radio,
    FormLabel,
    FormControlLabel,
} from "@mui/material";
import useSound from "use-sound";
import exampleImage from "../assets/example_image.png";
import exampleAudio from "../assets/example_audio.mp3";
import groupImage from "../assets/group.png";
import "../style/example.css";

const ExampleComponent = () => {
    // 状態管理用の変数と更新関数を定義
    const [finished, setFinished] = useState(false); // 例題が終了したかどうかの状態
    const [listened, setListened] = useState(false); // 音声を聞いたかどうかの状態
    const [value, setValue] = useState(""); // ラジオボタンの選択値の状態

    // 音声再生用の関数と停止用の関数を取得
    const [play, { stop }] = useSound(exampleAudio);

    // ラジオボタンの選択値が変更された時の処理
    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    };

    // 回答ボタンがクリックされた時の処理
    const handleSubmit = () => {
        stop(); // 音声の再生を停止
        setFinished(true); // 例題が終了した状態に更新
    };

    // 音声再生ボタンがクリックされた時の処理
    const handleAudioPlay = () => {
        play(); // 音声の再生
        setListened(true); // 音声を聞いた状態に更新
    };

    return (
        <div className="outline">
            <h1>例題</h1>
            <button
                className="btn btn-outline-primary"
                onClick={handleAudioPlay}
                disabled={listened}
            >
                クリックすると音声が流れます。
            </button>
            <div className="box_image">
                <img
                    src={exampleImage}
                    alt="question"
                    className="imageQuestion"
                />
            </div>
            <div className="form">
                <FormControl>
                    <FormLabel>例題を選んでください</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={value}
                        defaultValue="5"
                        onChange={handleChange}
                        disabled={finished}
                    >
                        <FormControlLabel
                            value="1"
                            name="radiobox"
                            control={<Radio />}
                            disabled={finished}
                            label="1"
                        />
                        <FormControlLabel
                            value="2"
                            name="radiobox"
                            control={<Radio />}
                            disabled={finished}
                            label="2"
                        />
                        <FormControlLabel
                            value="3"
                            name="radiobox"
                            control={<Radio />}
                            disabled={finished}
                            label="3"
                        />
                        <FormControlLabel
                            value="4"
                            name="radiobox"
                            control={<Radio />}
                            disabled={finished}
                            label="4"
                        />
                        <FormControlLabel
                            value="5"
                            name="radiobox"
                            control={<Radio />}
                            disabled={finished}
                            label="分からない"
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={finished}
                        >
                            回答
                        </Button>
                    </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        "分からない"の場合は理由を選択してください
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                    >
                        <MenuItem disabled={finished} value={1}>
                            音声が聞き取れなかった
                        </MenuItem>
                        <MenuItem disabled={finished} value={2}>
                            説明内容が複雑で理解できなかった
                        </MenuItem>
                        <MenuItem disabled={finished} value={3}>
                            読み上げ音声が速すぎて理解できなかった
                        </MenuItem>
                        <MenuItem disabled={finished} value={4}>
                            それらしい選択肢が複数あるので、どれか分からなかった
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="explain">
                <p>説明文</p>
                <FormLabel>
                    これから説明するグラフは都道府県別の自動車盗難件数に関するもので、件数の大きい順に並んでいます。
                    <br />
                    1位の都道府県から7位の都道府県までを3グループに分割し、1位から4位グループ、5位、6から7位グループとします。
                    <br />
                    5位の件数は1位から4位グループの7割程度です。
                    <br />
                    6から7位グループの件数は6位が5位の7割程度で、グループ内では急な傾斜があります。
                </FormLabel>
            </div>
            <FormLabel>
                今回の答え：<span className="explain">1</span>
            </FormLabel>
            <div className="explain">
                <p>グループ分け</p>
                <FormLabel>
                    今回聞いていただくグラフの説明には、グループ分けという言葉が出てきます。
                    <br />
                    グループ分けでは値が近いデータをひとまとめにして、それぞれについて説明します。
                    <br />
                    この場合では、1～4位、5位、6～7位の三つに分割して説明しました。
                    <br />
                    <span className="explain">
                        以降では、回答と説明が表示されません
                    </span>
                </FormLabel>
                <div className="box_image">
                    <img
                        src={groupImage}
                        alt="group"
                        className="imageQuestion"
                    />
                </div>
            </div>
        </div>
    );
};

export default ExampleComponent;
