import React from 'react';
import BlockBrowserBack from '../components/BlockBrowserBack';
import '../style/thankyou.css';

const Thankyou = () => {
    return (
        <div className='App-header'>
            <BlockBrowserBack></BlockBrowserBack>
            <div class="contents">
                    <h1 class="title">実験へのご協力<br/><span>ありがとうございました。</span></h1>
                </div>
        </div>
    );
}

export default Thankyou