import React, { useState } from 'react'
import { ReactDOM } from 'react'
import Chart from './Chart'

const ChartSelector = ({ data, title, unit }) => {

    const [year, setYear] = useState(2020)

    // Attention: Keys are strings!
    const yearsWithData = Object.keys(data)

    const decrementYear = () => {
        if (yearsWithData.includes(String(year - 1))) {
            setYear(year - 1)
        } else {
            alert(`No data available for year ${year - 1}`)
        }
    }

    const incrementYear = () => {
        if (yearsWithData.includes(String(year + 1))) {
            setYear(year + 1)
        } else {
            alert(`No data available for year ${year + 1}`)
        }
    }

    return (
        <div className="chart-selector">
            <h2 className="chart-selector-title">{title}</h2>
            <div>
                <Chart data={data[year]} title={year} unit={unit} />
            </div>
            <div className="year-controls">
                <button onClick={decrementYear}>-</button>
                {year}
                <button onClick={incrementYear}>+</button>
            </div>
        </div>
    )
}

export default ChartSelector