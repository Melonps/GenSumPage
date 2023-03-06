import React from 'react';
import Start from '../components/Start'
import MailTest from '../components/MailTest';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
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
                    <h2>１．研究の目的</h2>
                    <p>棒グラフを要約して伝える方法を研究しています。</p>
                </div>
                <div className='section'>
                    <h2>２．研究協力の方法</h2>
                    <p>棒グラフの説明を音声で聞き、説明に合うグラフを選択していただきます。</p>
                </div>
                <div className='section'>
                    <h2>３．報酬</h2>
                    <p>質問に回答していただいた方には、こちらで内容を確認した上で、お礼に500円分のAmazonギフトカード(Eメールタイプ)をお送りします。</p>
                    <p>3月20日頃までに必ず受取手続きをしてください。それまでにこちらからの連絡が届かない場合は、下記問い合わせ先にご連絡ください。</p>
                    <p>以下の場合に該当する時、回答をして頂いても謝礼を受け取れません</p>
                    <ol>
                        <li><CheckOutlinedIcon/>身元を明かさないために使用する一時的なメールアドレス（捨てメアド）を使った場合</li>
                        <li><CheckOutlinedIcon/>住所や電話番号などを適切に記載していない場合</li>
                        <li><CheckOutlinedIcon/>回答結果に明らかな不備があった場合</li>
                    </ol>
                </div>
                <div className='section'>
                    <h3>４．個人情報の扱い</h3>
                    <p>調査結果は研究成果として論文等で発表しますが、その際に個人が特定されることは一切ありません。</p>
                </div>
                <div className='section'>
                    <h3>５．倫理的配慮</h3>
                    <p>研究に協力していただく上で、以下の倫理的配慮を行います。</p>
                    <ol>
                        <li><CheckOutlinedIcon/>本研究への協力は本人の自由意志によるものであり、強制するものではありません。</li>
                        <li><CheckOutlinedIcon/>本研究への協力を拒否しても、なんら不利益を被ることはなく、いつでも中止できます。</li>
                        <li><CheckOutlinedIcon/>本研究のデータは、本研究に参加する研究者のみがアクセス出来るコンピュータやサーバに保管し、本研究およびそれに関連する研究以外には使用しません。</li>
                        <li><CheckOutlinedIcon/>本研究結果は論文等で発表しますが、個人が特定されることは一切ありません。</li>
                        <li><CheckOutlinedIcon/>研究終了後、個人が特定できるようなデータは全て破棄します。</li>
                    </ol>
                </div>
                <div className='section'>
                    <h3>６.問い合わせ先</h3>
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
            <div className='consent'>
                <div className='section'>
                    <h1>研究協力承諾書</h1>
                    <p>宛先：大阪府立大学 大学院情報学研究科 基幹情報学専攻 准教授 岩村雅一</p>
                    <ol>
                        <li><CheckOutlinedIcon />私は上記の文書を読み、研究の目的、研究協力の方法、報酬、個人情報の扱い、倫理的配慮について理解しました。 </li>
                        <li><CheckOutlinedIcon/>この研究によって得られたデータは厳重に管理されること、個人のプライバシーが守られること、個人が特定されないかたちで研究結果が公表されることを理解しました。 </li>
                        <li><CheckOutlinedIcon />研究への参加は強制されるものではなく自由意志に基づくものであり、研究に参加した後でも、いつでも自由に研究への参加を止めることができること、そしてこのことによって、不利益を被ることは一切ないことを理解しました。 </li>
                    </ol>
                    
                </div>
                
                
                <Start/>
            </div>
        </div>
    );
};



export default Login;