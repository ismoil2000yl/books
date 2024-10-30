import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes, initialSeconds, start }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60 + initialSeconds);

  useEffect(() => {
    setTimeLeft(start ? initialMinutes * 60 + initialSeconds : initialMinutes * 60 + initialSeconds); 
  }, [start]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / (initialMinutes * 60 + initialSeconds)) * circumference;

  return (
    <div className="timer" style={{ width: '50px', height: '50px' }}>
      <div className="circle" style={{ position: 'relative' }}>
        <svg width="50" height="50">
          <circle cx="25" cy="25" r={radius} fill="transparent" stroke="#ddd" strokeWidth="2" />
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="transparent"
            stroke="#1eb9ff"
            strokeWidth="2"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 1s linear',
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          />
        </svg>
        <div className="time" style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          fontSize: '12px',
          color: '#000' 
        }}>
          {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}
        </div>
      </div>
    </div>
  );
};

export default Timer;
