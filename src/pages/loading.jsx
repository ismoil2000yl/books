import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
    return (
        <section className='flex items-center justify-center min-h-[100vh] bg-[#001d10] section-loader'>
            <div className="loading relative w-[250px] h-[250px]">
                <div className="blocks" style={{ "--i": 1 }}></div>
                <div className="blocks" style={{ "--i": 2 }}></div>
                <div className="blocks" style={{ "--i": 3 }}></div>
                <div className="blocks" style={{ "--i": 4 }}></div>
                <div className="blocks" style={{ "--i": 5 }}></div>
                <div className="blocks" style={{ "--i": 6 }}></div>
                <div className="blocks" style={{ "--i": 7 }}></div>
                <div className="blocks" style={{ "--i": 8 }}></div>
                <div className="blocks" style={{ "--i": 9 }}></div>
                <div className="blocks" style={{ "--i": 10 }}></div>
                <div className="blocks" style={{ "--i": 11 }}></div>
                <div className="blocks" style={{ "--i": 12 }}></div>
                <div className="blocks" style={{ "--i": 13 }}></div>
                <div className="blocks" style={{ "--i": 14 }}></div>
                <div className="blocks" style={{ "--i": 15 }}></div>
                <div className="blocks" style={{ "--i": 16 }}></div>
                <div className="blocks" style={{ "--i": 17 }}></div>
                <div className="blocks" style={{ "--i": 18 }}></div>
                <div className="blocks" style={{ "--i": 19 }}></div>
                <div className="blocks" style={{ "--i": 20 }}></div>
                <h3 className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] loading-text'>BOOKS</h3>
            </div>
        </section>
    );
};

export default Loading;
