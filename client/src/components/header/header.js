import React from 'react';

const Header = () => {
    return (
        <div className="row border-bottom mb-4">
            <div className="col-6 p-4">
                <h1>CSV Parsing Test</h1>
            </div>
            <div className="col-6 p-4 text-secondary">
                Testing the public/images path: <img src="/images/pushpin.png" alt="pushpin" />
            </div>
        </div>
    );
};

export default Header;
