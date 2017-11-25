import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';

class PollResults extends Component {

  render() {
    const { title, options } = this.props;
    const totalVotes = options.reduce((acc, curr) => { return acc + curr.votes}, 0);
    const pointWidth = 20;

    const config = {
      chart: {
        type: 'bar',
        spacingTop: 0,
        spacingRight: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        marginBottom: 0,
        height: pointWidth * options.length + 10,
      },
      title: {
        text: null
      },
      colors: ['#4CB5F5'],
      legend: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.x}:</b> ${this.y} votes`;
        }
      },
      credits: {
        text: ''
      },
      xAxis: {
        categories: options.map(option => option.option),
        scrollbar: {
          enabled: true
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      yAxis: {
        title: {
          enabled: false,
          scrollbar: {
            enabled: true
          }
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
          groupPadding: 0,
          pointPadding: 0,
          pointWidth: pointWidth,
          dataLabels: {
            enabled: true,
            formatter: function() {
              if (totalVotes === 0) return '0%'
              return `${((this.y / totalVotes) * 100).toFixed(1)}%`
            }
          }
        }
      }
    };

    return (
      <div className='card-content' style={{ padding: '0', width: '100%', height: '100%' }}>
        <span className='card-title'>{title}
          <i
            className='material-icons right'
            onClick={this.props.onClick}
            style={{ cursor: 'pointer' }}
            >
            close
          </i>
        </span>
        <div style={{ margin: '10% auto' }}>
          <ReactHighCharts config={config}></ReactHighCharts>
        </div>
      </div>
    )
  }
}

export default PollResults;
