import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { minutes2HHMM, getRandomColor, toPercentile } from 'src/modules/common/lib/util';

type Props = {
  title: string;
  totalMinutes: number;
  minutesData: {
    name: string;
    minutes: number;
  }[];
};

const MAX_DISPLAY_COUNT = 15;
const TimeChart: React.FC<Props> = ({ title, totalMinutes, minutesData }) => {
  const chartRef = useRef<Pie>(null);

  const filteredMinutesData = minutesData.slice(0, MAX_DISPLAY_COUNT);
  const chartData = {
    data: {
      labels: filteredMinutesData.map(
        ({ name, minutes }) => `${name}: ${minutes2HHMM(minutes)} (${toPercentile(totalMinutes, minutes)})`
      ),
      datasets: [
        {
          backgroundColor: filteredMinutesData.map(() => getRandomColor()),
          data: filteredMinutesData.map(({ minutes }) => minutes),
        },
      ],
    },
    options: {
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            return data.labels[tooltipItem.index];
          },
        },
      },
      title: {
        display: true,
        text: title,
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'left' as const,
        align: 'center' as const, // start, center, end
        fullWidth: true,
        labels: {
          boxWidth: 40,
        },
        onClick: (_e: any, _legendItem: any) => {
          // let index = legendItem.index;
          // const chart = chartRef.current?.chartInstance as Chart;
          // let meta;
          // (chart.data.datasets || []).forEach((_, i) => {
          //   meta = chart.getDatasetMeta(i);
          //   if (meta.data[index]) {
          //     meta.data[index].hidden = !meta.data[index].hidden;
          //   }
          // });
          // chart.update();
        },
      },
    },
  };

  return (
    <CCard>
      <CCardHeader>
        {title} (총 {minutes2HHMM(totalMinutes)}) -{`총 ${minutesData.length} 중 ${filteredMinutesData.length} 표현`}
      </CCardHeader>
      <CCardBody>
        {totalMinutes ? <Pie ref={chartRef} data={chartData.data} options={chartData.options} /> : '-'}
      </CCardBody>
    </CCard>
  );
};

export default TimeChart;
