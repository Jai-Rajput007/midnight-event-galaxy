
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      <div className="countdown-box w-16 h-16 md:w-24 md:h-24 rounded-md flex flex-col items-center justify-center">
        <span className="text-2xl md:text-4xl font-bold text-white">{formatNumber(days)}</span>
        <span className="text-xs text-gray-400">DAYS</span>
      </div>
      
      <div className="countdown-box w-16 h-16 md:w-24 md:h-24 rounded-md flex flex-col items-center justify-center">
        <span className="text-2xl md:text-4xl font-bold text-white">{formatNumber(hours)}</span>
        <span className="text-xs text-gray-400">HOURS</span>
      </div>
      
      <div className="countdown-box w-16 h-16 md:w-24 md:h-24 rounded-md flex flex-col items-center justify-center">
        <span className="text-2xl md:text-4xl font-bold text-white">{formatNumber(minutes)}</span>
        <span className="text-xs text-gray-400">MINUTES</span>
      </div>
      
      <div className="countdown-box w-16 h-16 md:w-24 md:h-24 rounded-md flex flex-col items-center justify-center">
        <span className="text-2xl md:text-4xl font-bold text-white">{formatNumber(seconds)}</span>
        <span className="text-xs text-gray-400">SECONDS</span>
      </div>
    </div>
  );
};

export default Countdown;
