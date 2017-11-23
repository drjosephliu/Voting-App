import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';

class PollResults extends Component {

  render() {
    const { title, options } = this.props;
    const config = {
      chart: {
        type: 'bar',
        spacingTop: 0,
        spacingRight: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        // marginTop: 0,
        // marginRight: 0,
        // marginBottom: 0,
        // marginLeft: 0
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      credits: {
        text: ''
      },
      xAxis: {
        categories: options.map(option => option.option),
        // lineWidth: 0,
        // tickWidth: 0,
      },
      yAxis: {
        title: {
          enabled: false,
        },
        gridLineWidth: 0,
        tickAmount: 0,
        showFirstLabel: false,
        showLastLabel: false
      },
      series: [{
        data: options.map(option => option.votes)
      }],
      plotOptions: {
        bar: {
          // groupPadding: 0,
          // pointPadding: 0,
          dataLabels: {
            enabled: true
          }
        },
        series: {
          pointWidth: 20,
          groundPadding: 0,
          pointPadding: 0
        }
      }
    };

    return (
      <div className='card-content' style={{ border: '2px solid blue', padding: '0' }}>
        <span className='card-title'>{title}
          <i
            className='material-icons right'
            onClick={this.props.onClick}
            style={{ cursor: 'pointer' }}
            >
            close
          </i>
        </span>
        <div style={{ width: '100%', height: '100%', margin: 'auto', border: '2px solid red' }}>
          <ReactHighCharts config={config}></ReactHighCharts>
        </div>
      </div>
    )
  }
}

export default PollResults;
