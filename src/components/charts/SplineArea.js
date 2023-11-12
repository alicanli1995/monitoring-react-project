import React, {useEffect, useState} from "react"
import ReactApexChart from "react-apexcharts"
import {getChartColorsArray} from "../../utils/utils";

const SpineArea = (props) => {
  const chartColorsArray = getChartColorsArray(props.dataColors);
  const [data, setData] = useState([])
  const [options, setOptions] = useState({
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: chartColorsArray,
    xaxis: {
      type: "datetime",
      categories: data?.map((d) => new Date(d.CreatedAt).getTime()),
      labels: {
        format: "HH:mm",
      },
      offsetX: 0,
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "HH:mm",
      },
    },
  })
  const [series, setSeries] = useState([
    {
      name: "Response Time",
      data: data?.map((d) => (d.TotalTime / 1000000).toFixed(2)),
      formatter: (value) => value + " ms",
    },
  ])

  useEffect(() => {
    setData(props.data)
    setSeries([
      {
        name: "Response Time",
        data: props.data?.map((d) => (d.TotalTime / 1000000).toFixed(2)),
        formatter: (value) => value + " ms",
      },
    ])

    setOptions({
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      colors: chartColorsArray,
      xaxis: {
        type: "datetime",
        categories: props.data?.map((d) => new Date(d.CreatedAt).getTime()),
        labels: {
          format: "HH:mm",
        },
        offsetX: 0,
      },
      grid: {
        borderColor: "#f1f1f1",
      },
      tooltip: {
        x: {
          format: "HH:mm",
        },
      },
    })
  }, [props.data])

  return (
      <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="350"
          width={740}
      />
  )
}

export default SpineArea
