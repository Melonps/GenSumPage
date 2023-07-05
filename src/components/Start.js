import React, { useState } from "react";
import {
    collection,
    doc,
    serverTimestamp,
    getCountFromServer,
    updateDoc,
    getDoc,
    addDoc,
} from "firebase/firestore";
import {
    Box,
    TextField,
    Button,
    FormControlLabel,
    FormGroup,
    Checkbox,
    FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loading from "./Loading";
import "../style/start.css";
import { db } from "../firebase/firebase";

const Start = () => {
    // State variables
    const [email, setEmail] = useState(""); // メールアドレスのState
    const [emailError, setEmailError] = useState(""); // メールアドレスのエラーメッセージのState
    const [isConsented, setIsConsented] = useState(false); // 研究への同意のState
    const [isSent, setIsSent] = useState(false); // メールが送信されたかどうかのState
    const [password, setPassword] = useState(""); // パスワードのState
    const [inputpassword, setInputPassword] = useState(""); // 入力されたパスワードのState
    const [passwordError, setPasswordError] = useState(""); // パスワードのエラーメッセージのState
    const [isLoading, setIsLoading] = useState(false); // ローディング状態のState
    const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージのState
    const navigate = useNavigate(); // ページ遷移のためのフック

    const validateEmail = (email) => {
        // メールアドレスのバリデーション関数
        const pattern =
            /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;
        return pattern.test(email);
    };

    const handleEmailChange = (e) => {
        // メールアドレスの変更時の処理
        setEmail(e.target.value);
        setEmailError("");
    };

    const handlePasswordChange = (e) => {
        // パスワードの変更時の処理
        setInputPassword(e.target.value);
        if (e.target.value === password) {
            setPasswordError("");
        } else {
            setPasswordError("パスワードが一致しません");
        }
    };

    const handleConsentChange = () => {
        // 研究への同意の変更時の処理
        setIsConsented(!isConsented);
    };

    const handleBlur = () => {
        // メールアドレスのフォーカスが外れた時の処理
        if (!email) {
            setEmailError("メールアドレスを入力してください");
        } else if (!validateEmail(email)) {
            setEmailError("メールアドレスにマッチしていません");
        }
    };

    const handleBlurPassword = () => {
        // パスワードのフォーカスが外れた時の処理
        if (!password) {
            setPasswordError("パスワードを入力してください");
        }
    };

    const sendMail = async () => {
        // メール送信ボタンがクリックされた時の処理
        if (!isConsented || emailError || isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                "https://6pvtw18zob.execute-api.ap-northeast-1.amazonaws.com/default/SendMail",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(email),
                }
            );

            if (!response.ok) {
                throw new Error("サーバーエラー");
            }

            const data = await response.text();
            setPassword(data);
            setIsSent(true);
        } catch (error) {
            setErrorMessage(
                "再度ボタンを押してみてください。\nそれでも駄目なら、別のメールアドレスを使用するか、管理者に連絡してください。"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartClick = async () => {
        // 実験開始ボタンがクリックされた時の処理
        if (!isSent || passwordError || isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            // データベースの参照を作成
            const signinData = collection(db, "signin");

            // サーバーからデータのカウントを取得
            const snapshot = await getCountFromServer(signinData);
            const index = snapshot.data().count + 1;

            // 新しいユーザーデータを追加
            const signuserRef = await addDoc(signinData, {
                id: String(index),
                email: email,
                timestamp: serverTimestamp(),
            });

            // 新しく追加されたドキュメントのIDを取得
            const newDocid = signuserRef.id;

            // 別のコレクションからユーザーデータを取得
            const userData = collection(db, "users");
            const usersDocRefId = doc(userData, String(index));
            const usersDocId = await getDoc(usersDocRefId);

            // サインイン済みユーザーのドキュメントを更新
            const signeduserRef = doc(db, "signin", newDocid);
            await updateDoc(signeduserRef, {
                isread: true,
                newdocid: newDocid,
            });

            // サーベイページに遷移し、必要な情報を渡す
            navigate("/survey", {
                state: {
                    confirmed: true,
                    email: email,
                    id: index,
                    Docid: newDocid,
                    QuestionIdx: usersDocId.data().QuestionIdx,
                },
            });
        } catch (error) {
            setErrorMessage("データの送信に失敗しました．再送信してください");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isConsented}
                            onChange={handleConsentChange}
                        />
                    }
                    label="研究に協力することを承諾します。"
                />
            </FormGroup>
            <FormLabel>
                メールアドレスを入力して、送信ボタンを押してください。
                <br />
                そして送られたパスワードを入力してください。
            </FormLabel>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                    id="input-with-sx"
                    label="メールアドレス"
                    variant="standard"
                    onBlur={handleBlur}
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isConsented || isLoading}
                />
                <Button
                    variant="contained"
                    onClick={sendMail}
                    disabled={!isConsented || emailError || isSent || isLoading}
                >
                    メール送信
                </Button>
            </Box>
            {emailError && <FormLabel>{emailError}</FormLabel>}
            <FormLabel>{errorMessage}</FormLabel>
            <Box sx={{ p: 1 }}>
                <FormLabel>{isSent && "メールを送信しました。"}</FormLabel>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockOpenIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                    id="input-with-sx"
                    label="password"
                    variant="standard"
                    onBlur={handleBlurPassword}
                    type="password"
                    value={inputpassword}
                    onChange={handlePasswordChange}
                    disabled={!isSent || isLoading}
                />
                <Button
                    variant="contained"
                    width="full"
                    onClick={handleStartClick}
                    disabled={!isSent || passwordError || isLoading}
                >
                    実験開始
                </Button>
            </Box>
            {passwordError && <FormLabel>{passwordError}</FormLabel>}
            {isLoading ? <Loading /> : <br />}
        </>
    );
};

export default Start;
