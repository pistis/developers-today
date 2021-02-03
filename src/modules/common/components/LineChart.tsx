import React from 'react';
import { Line } from 'react-chartjs-2';

type Props = {
  height: number;
  labels: string[];
  maxMinutes: number;
  minutesDatas: {
    name: string;
    minutes: number[];
    backgroundColor?: string;
    borderColor?: string;
    pointHoverBackgroundColor?: string;
    hexColor?: string;
  }[];
};

// const MAX_DISPLAY_COUNT = 15;
const LineChart: React.FC<Props> = ({ height, labels, maxMinutes, minutesDatas }) => {
  const datasets = minutesDatas.map((minutesData) => {
    return {
      label: minutesData.name,
      data: minutesData.minutes,
      //   fill: false,
      backgroundColor: minutesData.backgroundColor,
      borderColor: minutesData.borderColor,
      pointHoverBackgroundColor: minutesData.pointHoverBackgroundColor,
      borderWidth: 2,
      //   borderDash: [8, 5],
      // backgroundColor: 'transparent',
    };
  });
  // console.log('datasets', datasets);
  const chartData = {
    data: {
      labels,
      datasets,
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'left' as const,
        align: 'center' as const, // start, center, end
        fullWidth: true,
        labels: {
          boxWidth: 40,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(maxMinutes / 5),
              max: maxMinutes,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    },
  };

  return <Line {...height} data={chartData.data} options={chartData.options} />;
};

export default LineChart;
