import React, { useState } from "react";
import {
    InputLabel,
    Select,
    Button,
    MenuItem,
    FormControl,
    RadioGroup,
    Radio,
    FormLabel,
    FormControlLabel,
} from "@mui/material";
import urlJoin from "url-join";
import useSound from "use-sound";

const Question = (props) => {
    // ステートの初期化
    const [listened, setListened] = useState(false);
    const [finished, setFinished] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [value, setValue] = useState("");
    const [reason, setReason] = useState("");
    const [startTime, setStartTime] = useState();

    const ex_num_str = props.id;
    const ex_num = Number(ex_num_str);
    const question_idx = String(props.q_id);
    // URLの作成
    const url =
        ex_num % 2 === 1
            ? urlJoin(
                  "https://raw.githubusercontent.com/Melonps/gen_sum_data1/prod/question_data",
                  ex_num_str,
                  question_idx
              )
            : urlJoin(
                  "https://raw.githubusercontent.com/Melonps/gen_sum_data2/prod/question_data",
                  ex_num_str,
                  question_idx
              );
    const audio_path = `${url}.mp3`;
    const image_path = `${url}.png`;

    const audio = new Audio(audio_path);
    const [play, { stop }] = useSound(audio_path);

    // ラジオボタンの選択変更時のハンドラー
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // 回答ボタンのクリック時のハンドラー
    const submit = () => {
        if (value) {
            const endTime = performance.now();
            props.addans(value);
            props.addreason(reason);
            props.addnext(1);
            console.log(endTime - startTime);
            props.addtime(endTime - startTime);
            setFinished(true);
            stop();
        } else {
            setHelperText("Please select an option.");
        }
    };

    // 音声再生ボタンのクリック時のハンドラー
    const audio2 = () => {
        play();
        setListened(true);
        setStartTime(performance.now());
    };

    // 理由の選択変更時のハンドラー
    const handleChange2 = (e) => {
        setReason(e.target.value);
    };

    return (
        <div className="outline">
            <h1>質問{String(props.idx + 1)}</h1>
            <button
                className="btn btn-outline-primary"
                onClick={audio2}
                disabled={listened}
            >
                クリックすると音声が流れます。
            </button>
            <FormLabel>音声を必ず聞いてください</FormLabel>
            <div className="box_image">
                <img
                    src={image_path}
                    alt="question"
                    className="imageQuestion"
                />
            </div>
            <div className="form">
                <FormControl>
                    <FormLabel>
                        質問 {String(props.idx + 1)} 選んでください
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={value}
                        defaultValue="5"
                        onChange={handleChange}
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
                            onClick={submit}
                            disabled={finished}
                        >
                            回答
                        </Button>
                    </RadioGroup>
                    <FormLabel>{helperText}</FormLabel>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        "分からない"の場合は理由を選択してください
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reason}
                        label="Age"
                        onChange={handleChange2}
                        disabled={finished}
                    >
                        <MenuItem disabled={finished} value={1}>
                            音声が聞き取れなかった
                        </MenuItem>
                        <MenuItem disabled={finished} value={2}>
                            説明内容が複雑で理解できなかった
                        </MenuItem>
                        <MenuItem disabled={finished} value={3}>
                            読み上げ音声が速過ぎて理解できなかった
                        </MenuItem>
                        <MenuItem disabled={finished} value={4}>
                            それらしい選択肢が複数あるので、どれか分からなかった
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default Question;
