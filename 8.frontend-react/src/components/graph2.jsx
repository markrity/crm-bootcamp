
import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import  { useEffect} from "react";
import '../style/graphs.css'
class Graph2 extends Component {
    constructor(){
        super();
        this.state = {
          chartData:{}
        }
      }

      componentDidMount() {
        this.getChartData();
      }
    
      getChartData() {
        //  let labels = [];
        axios.post('http://localhost:991/clients/getBigClient/', {
                account_id: 10
             }).then(res => {
                console.log(res.data.clients);
                const coin = res.data.clients;
                
                console.log(coin);
                let clients = [];
                let sumOfPayments = [];
                coin.map(element => {
                    clients.push(element.fullname)
                    sumOfPayments.push(element.sum1)
                });
                console.log(clients);
                console.log(sumOfPayments);

              
            this.setState({
              chartData: 
              { 
                labels: clients,
                datasets: [
                 { 
                    label: 'all payments',
                    data: sumOfPayments,
                    backgroundColor: [
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)"
                    ],
                  }
                ]
            }
            });
        });
        }
     
      render(){
      return (
          <div>
              <p id = "p_gra2">The customers who pay the most</p>
        <div className="graph2" >
           
          <Bar
            data={this.state.chartData}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:10
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
        </div>
      );
    }
}
    export default Graph2;


