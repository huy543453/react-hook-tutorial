import React, { useEffect, useState } from "react";

const CountDown = (props) => {
    const { timeUp } = props;
    const [count, setCount] = useState(5);
    const covertToHHMMSS = (count) => {
        if (count > 3600) {
            return new Date(count * 1000).toISOString().substring(11, 19);
        } else {
            return new Date(count * 1000).toISOString().substring(14, 19);
        }
    };
    // useEffect(() => {
    //     if (count === 0) return;
    //     // lặp vô hạn với setInterval
    //     const timer = setInterval(() => {
    //         setCount(count - 1);
    //     }, 1000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [count]);

    useEffect(() => {
        if (count === 0) {
            timeUp();
            return;
        }
        setTimeout(() => {
            setCount(count - 1);
        }, 1000);
    }, [count]);

    return <>{covertToHHMMSS(count)}</>;
};

export default CountDown;
