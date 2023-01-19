import React from 'react';
import Start from '../components/Start'
import headerimg from '../images/barchart.jpg';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import '../style/login.css';

const Login = () => {


    return (
        
        <div>
            <div className='App-header'>
                <img src={headerimg} className="header-logo" alt="logo" />
                <h1 class="title">グラフの要約文に関するデータ収集</h1>
            </div>
            <div className='consent'>
                <div className='section'>
                    
                    <h2>１．研究の目的</h2>
                    <p>私たちは、棒グラフのデータから自動で要約を作成する研究をしています。</p>
                </div>
                <div className='section'>
                    <h2>２．研究協力の方法</h2>
                    <p>要約についての音声を聞き取ってもらい、要約が示しているグラフの画像を選択していただきます。</p>
                </div>
                <div className='section'>
                    <h3>３．個人情報の扱い</h3>
                    <p>調査結果は研究成果として論文等で発表しますが、その際に個人が特定されることは一切ありません。</p>
                </div>
                <div className='section'>
                    <h3>４．倫理的配慮</h3>
                    <p>調研究に協力していただく上で、以下の倫理的配慮を行います。</p>
                    <ol>
                        <li><CheckOutlinedIcon/>本研究への協力は本人の自由意志によるものであり、強制するものではありません。</li>
                        <li><CheckOutlinedIcon/>本研究への協力を拒否しても、なんら不利益を被ることはなく、いつでも中止できます。</li>
                    </ol>
                </div>
            </div>
            <div className='consent'>
                <h1>研究協力承諾書</h1>
                <p>
                    １．私は上記の文書を読み、研究の目的、研究協力の方法、報酬、個人情報の扱い、倫理的配慮について理解しました。 
                </p>
                <Start/>
            </div>
        </div>
    );
};



export default Login;