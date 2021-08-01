import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactApexChart from 'react-apexcharts'
import axios from 'axios';

class Graph4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {series:[],
            options: {
                chart: {
                  type: 'pie'
                
                },
                labels: ['laser', 'acne', 'anti aging', 'pigmentation', 'Standard treatment'],
                colors:['rgba(222, 190, 248, 1)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)','rgba(221, 248, 190, 1)', 'rgba(190, 207, 248, 1)']
              }
        }
      }

      componentDidMount() {
        this.getChartData();
      }
      getChartData() {
        axios.post('http://localhost:991/treatments/getTreatmentByKind/', {
            account_id: 10
         }).then(res => {
            console.log(res.data.treatment);
            const coin = res.data.treatment;
            let data1 = {'laser ':0, 'acne':0,'anti aging':0,'pigmentation':0,'Standard treatment':0}
            coin.map(element => {
                data1[element.kind] = element.count1
            });
            let data2=[]
            console.log(data1);
            for (const property in data1) {
                data2.push(parseInt(data1[property]));
              }
            console.log(data2);
            this.setState({series: data2})
         });
         
      }
   

  render() {
    return (
        <div>
       <p id = "p_gra4">Distribution of types of treatments</p> 
        <div className="graph4">
        <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={470} />
      </div>
      </div>
    );
  }
  }

  export default Graph4;
