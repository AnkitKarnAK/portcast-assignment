import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { AssetHistory } from '@/services/coincap';
import { formatDate } from '@/utils/tranformers.utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


type AssetHistoryChartProps = {
    history: AssetHistory[];
}

export const AssetHistoryChart = ({ history }: AssetHistoryChartProps) => {
    const labels = history.map((item) => formatDate(item.date));
    const dataPoints = history.map((item) => parseFloat(item.priceUsd));

    const data = {
        labels,
        datasets: [
            {
                label: 'Average Price (USD)',
                data: dataPoints,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: 'Price History (30 Days)' },
        },
    };

    return <Line data={data} options={options} />;
};