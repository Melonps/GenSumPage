import React from 'react';
import '../style/login.css';

import BlockBrowserBack from '../components/BlockBrowserBack';


const Login = () => {


    return (
        
        <div>
            <BlockBrowserBack/>
            <div className='App-header'>
                <div className="contents">
                    <h1 className="title">グラフの説明文の<br/>理解に関する調査</h1>
                </div>
            </div>
            <div className='consent'>
                <div className='section'>
                    <h1>お知らせ</h1>
                    <p>実験の受付期間が終了しました。多くの方にご参加いただき、誠にありがとうございました。<br/>
                        現在、謝礼を送信するための準備を行っております。今しばらくお待ちください。</p>
                </div>
                <div className='section'>
                    <h2>問い合わせ先</h2>
                    <p>大阪公立大学　大学院情報学研究科　基幹情報学専攻　准教授　岩村雅一
                    </p>
                    <ol>
                        <li>住所：〒599-8531　大阪府堺市中区学園町1-1</li>
                        <li>電話番号：072-254-9277</li>
                        <li>メールアドレス：masa.i@omu.ac.jp</li>
                    </ol>
                    <p>大阪府立大学　工学域　電気電子学類　4年　筧万里</p>
                    <ol>
                        <li>メールアドレス：sdb01029@st.osakafu-u.ac.jp</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};



export default Login;