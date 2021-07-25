
import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import  { useEffect} from "react";
import '../style/graphs.css'
class Graph1 extends Component {
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
        axios.post('http://localhost:991/kinds/getGraph1Data/', {
                account_id: 10
             }).then(res => {
                console.log(res.data.type_data);
                const coin = res.data.type_data;
                let data = {};
                let types = ['acne', 'anti aging', 'laser ', 'pigmentation', 'Standard treatment'];
                let countOfType = {}
                types.forEach(element=>{
                    countOfType[element]=[]
                })
                console.log(countOfType);
                
                coin.forEach(element=> {
                    if (element.user_name in data) {
                        data[element.user_name][element.type_name] =element.perc
                    }
                    else {
                        data[element.user_name] = {}
                        data[element.user_name][element.type_name] = element.perc
                    }
                })
                
                console.log(data);

                const users = Object.keys(data);

                users.forEach(user=> {
                    types.forEach(type=> {
                        if (type in data[user]) {
                            countOfType[type].push(data[user][type])
                        }
                        else {
                            countOfType[type].push('0')
                        }  
                    })
                })

                console.log(countOfType);

            this.setState({
              
              chartData: 
              { 
                labels: users,
                datasets: [
                 { 
                    label: 'laser',
                    data: countOfType['laser '],
                    backgroundColor: [
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)",
                      "rgba(222, 190, 248, 1)"
                    ],
                  }
                  ,{
                    label: "acne",
                    data: countOfType['acne'],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(255, 99, 132, 0.6)"
                    ],
                  } 
                  ,{
                    label: "anti aging",
                    data: countOfType['anti aging'],
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(54, 162, 235, 0.6)"
                    ],
                  } 
                  ,{
                    label: "pigmentation",
                    data: countOfType['pigmentation'],
                    backgroundColor: [
                      "rgba(221, 248, 190, 1)",
                      "rgba(221, 248, 190, 1)",
                      "rgba(221, 248, 190, 1)",
                      "rgba(221, 248, 190, 1)",
                      "rgba(221, 248, 190, 1)"
                    ],
                  } 
                  ,{
                    label: "Standard treatment",
                    data: countOfType['Standard treatment'],
                    backgroundColor: [
                      "rgba(190, 207, 248, 1)",
                      "rgba(190, 207, 248, 1)",
                      "rgba(190, 207, 248, 1)",
                      "rgba(190, 207, 248, 1)",
                      "rgba(190, 207, 248, 1)"
                    ],
                  } 
                ]
            }
            });
        });
        }
     
      render(){
      return (
        <div >
        <p id="p_gra1"> Percentage of types for each user</p>
        <div className="graph1" >
        
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
    export default Graph1;


