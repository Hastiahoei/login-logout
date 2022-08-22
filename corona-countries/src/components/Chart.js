import React from "react";
import Bar from "./Bar";

// data sollten in Form eines Objektes übergeben werden!
const Chart = ({ data, unit, title }) => {

    // Scale height of the highest bar to a fixed percentage of viewport height
    const maxViewportHeightFraction = 0.3

    const maxValue = Math.max(...Object.values(data))

    const maxHeight = window.innerHeight * maxViewportHeightFraction

    return <div className="chart-container">
        <h3 className="chart-title">{title}</h3>
        <h4 className="chart-unit">Unit: {unit}</h4>

        <div className="chart">
            {Object.entries(data).map((pair) => <Bar
            key={pair}
            label={pair[0]}
            value={pair[1]}
            height={pair[1] / maxValue * maxHeight} />)}
        </div>
    </div>
}

export default Chart