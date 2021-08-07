
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import DateDropDownList from '../../CustomComponents/DateDropDownList'
import './ApexChart.scss'
const ApexChart = ({ height, series, options, type, header }) => {
    return (
        <div className="chart-bg">
            <div id="chart" className="chart">
                <div className="flex-row centered">
                    <h3 className="centered">{header}</h3>
                    {/* <DateDropDownList /> */}
                </div>
                <ReactApexChart
                    type={type}
                    options={options}
                    series={series}
                    height={height}
                    width={600} />
            </div>
        </div>
    );
}

export default ApexChart