import React from 'react';
import logo from '../images/cpu.png';


import Start from '../components/Start'

const Login = () => {


    return (

        <div>
            <h1>ログインページ</h1>
            <img src={logo} className="App-logo" alt="logo" />
            <div class="consent">
                <h1>研究協力承諾書</h1>
                <p><br/>
                    １．私は上記の文書を読み、研究の目的、研究協力の方法、報酬、個人情報の扱い、倫理的配慮について理解しました。 
                </p>
            </div>    

            <Start/>
        </div>
    );
};



export default Login;