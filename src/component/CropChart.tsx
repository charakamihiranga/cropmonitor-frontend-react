import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { Crop } from "../model/Crop";
import { RootState } from "../store/Store";

function CropChart() {
    const crops: Crop[] = useSelector((state: RootState) => state.crop);

    // Group crops by category and calculate counts
    const cropCategoryData = crops.reduce<{ [key: string]: number }>((acc, crop) => {
        acc[crop.cropCategory] = (acc[crop.cropCategory] || 0) + 1;
        return acc;
    }, {});

    // Convert grouped data to the Highcharts series format
    const chartData = Object.entries(cropCategoryData).map(([category, count]) => ({
        name: category,
        y: count,
    }));

    const options = {
        chart: {
            type: "pie",
            style: {
                fontFamily: "Poppins", // Set global font family
            },
        },
        title: {
            text: 'Crop Categories',
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    style: {
                        fontFamily: "Poppins", // Set font for data labels
                        fontSize: "10px",
                    },
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
            },
        },
        series: [
            {
                name: "Crops",
                colorByPoint: true,
                data: chartData,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default CropChart;
