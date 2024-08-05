'use client'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { usePathname, useRouter } from 'next/navigation';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: { accounts: any[] }) => {

  const accountNames = accounts.map((data)=> data.name)
  const accountBalances = accounts.map((data)=> data.currentBalance)
  const data = {
    labels: accountNames,
    datasets: [
      {
        label: 'Banks',
        data: accountBalances,
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
      }
    ]
  };

  return (
    <Doughnut data={data} 
    options={
        {
            cutout:'60%',
            plugins:{
                legend:{
                    display: false
                }
            }
        }
    }/>
  );
};

export default DoughnutChart;
