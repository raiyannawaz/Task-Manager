import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

export default function PieChart({pieChartLabel, pieChartData}) {
 
  let { labels, data } = pieChartData;

  ChartJS.register(ArcElement, Tooltip, Legend)

  const chartData = {
    labels,
    datasets: [
      {
        label: pieChartLabel,
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Pie className="p-5 lg:p-3" data={chartData} options={options}/>
  )
}
