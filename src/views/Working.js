import React from 'react';
import BlockBrowserBack from '../components/BlockBrowserBack';
import { useNavigate } from 'react-router-dom';
import '../style/thankyou.css';

const Working = () => {
    const navigate = useNavigate();
    const move = () => {
        navigate('/login');
    }
    
    return (
        <div className='App-header'>
            <BlockBrowserBack></BlockBrowserBack>
            <div class="contents">
                    <h1 class="title"><span>ただいま</span><span>メンテナンス中です。</span><br/><span>しばらくしてからアクセスしてください。</span></h1>
            </div>
            <button onClick={move}></button> 
        </div>
    );
}

export default Working