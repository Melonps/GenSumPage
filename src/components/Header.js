import React from 'react';
import headerimg from '../assets/barchart.jpg';

class Header extends React.Component {
    render() {
        return (
        <div className='image-header'>
            <img src={headerimg} className="header-logo" alt="logo" />
        </div>
        );
    }
}

export default Header;