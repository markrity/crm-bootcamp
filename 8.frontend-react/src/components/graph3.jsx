import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import { Line } from "react-chartjs-2";



class Graph3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    axios.post('http://localhost:991/treatments/getTreByMonth/', {
        account_id: 10
     }).then(res => {
       // console.log(res.data.treatment);
        const coin = res.data.treatment;
        let month = {'January':'1', 'February':'2', 'March':'3', 'April':'4', 'May':'5', 'June':'6', 'July':'7', 'August':'8', 'September':'9', 'October':'10', 'November':'11', 'December':'12'}
        let data1 = {'1':'0', '2':'0','3':'0','4':'0','5':'0','6':'0','7':'0','8':'0','9':'0','10':'0', '11':'0', '12':'0'}
        let data3 = {'1':'0', '2':'0','3':'0','4':'0','5':'0','6':'0','7':'0','8':'0','9':'0','10':'0', '11':'0', '12':'0'}
        //array of sum payment
        coin.map(element => {
            data1[element.the_month] = element.sum1
        });
        let data2=[]
        for (const property in data1) {
            data2.push(`${data1[property]}`);
            }
        console.log(data2);

        //array of count treatment
        coin.map(element => {
            data3[element.the_month] = element.count1
        });
        let data4=[]
        for (const property in data3) {
            data4.push(`${data3[property]}`);
            }
        console.log(data4);

      this.setState({ data : 
       {labels:['January', 'February',
       'March', 'April', 'May', 'June', 'July', 
       'August', 'September', 'October', 'November', 'December'],
       datasets: [
        {
          label: "incomes",
          data: data2,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          yAxisID: 'y-axis-1'
        }
        ,
        {
          label: "count of treatments",
          data: data4,
          fill: false,
          borderColor: "#742774",
          yAxisID: 'y-axis-2'
        }
      ]
      }})
      const options = {
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                drawOnArea: false,
              },
            },
          ],
        },
      };

     
    });
  }


  render() {
    return (
    <div>
        <p id = "p_gra3">Incomes/count of treatment by months</p>
      <div className="graph3">
        <div className="row">
          <div className="mixed-chart">
          <Line data={this.state.data} width={300} />
          </div>
        </div>
      </div>
      </div>
    );
  }
  }

  export default Graph3;
