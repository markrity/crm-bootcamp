import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import '../App.css'
import { logout } from '../actions/auth'
import ClickableTxt from '../Components/ClickableTxt';
import Header from '../Components/Header';
import { useHistory } from 'react-router';
import ApexChart from '../Components/Stats/Artists/ApexChart';
import SideNavBar from '../Components/SideNavBar';
import { getStats } from '../actions/stats'
import { checkAuth } from '../actions/auth';

const HomePage = ({ isOnline }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStats(12))
    }, [])
    const { artistsStats, hallStats } = useSelector(state => state.stats)
    return (
        <div className="flex-col">
            <Header />
            <div className="flex-row">
                <SideNavBar selected="Create Event" />
                {artistsStats && hallStats &&
                    <div className="flex-row spaced-evenly mg-horizontal  full-width">
                        <div className="flex-col mg-bottom spaced-evenly space-around">
                            {<ApexChart header="Artists Stats"
                                height={250} type={"bar"}
                                series={[{ data: artistsStats.numberOfPerformences.map(number => parseInt(number)) }]}
                                options={{
                                    chart: {
                                        type: 'bar',
                                        height: 350
                                    },
                                    plotOptions: {
                                        bar: {
                                            borderRadius: 4,
                                            horizontal: true,
                                        }
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    xaxis: {
                                        categories: artistsStats.names,
                                    }
                                }} />}
                            <ApexChart header="Halls Stats" height={250} type={"line"} series={hallStats.series} options={{
                                chart: {
                                    height: 350,
                                    type: 'line',
                                },
                                stroke: {
                                    curve: 'smooth'
                                },
                                fill: {
                                    type: 'solid',
                                    opacity: [0.35, 1],
                                },
                                labels: hallStats.labels,
                                markers: {
                                    size: 0
                                },
                                yaxis: [
                                    {
                                        title: {
                                            text: 'Series A',
                                        },
                                    },
                                    {
                                        opposite: true,
                                        title: {
                                            text: 'Series B',
                                        },
                                    },
                                ],
                                tooltip: {
                                    shared: true,
                                    intersect: false,
                                    y: {
                                        formatter: function (y) {
                                            if (typeof y !== "undefined") {
                                                return y.toFixed(0) + " points";
                                            }
                                            return y;
                                        }
                                    }
                                }
                            }} />
                        </div>
                        <div className="flex-col centered">
                            {/* <ApexChart height={400} artistsStats={artistsStats} /> */}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage
