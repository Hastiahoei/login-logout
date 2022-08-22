import React from 'react';

const Bar = ({label, value, height}) => {

    const valueStyle = {height: height+'px'}

    return <div className="bar">
        <div className="value" style={valueStyle}>{value}</div>
        <div className="label">{label}</div>
    </div>
}

export default Bar