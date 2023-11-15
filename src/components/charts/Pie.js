import React, {useEffect, useState} from "react";
import ReactEcharts from "echarts-for-react";
import {getChartColorsArray} from "../../utils/utils";

const Pie = (props) => {
  const [upCount, setUpCount] = useState(0)
  const [downCount, setDownCount] = useState(0)

  useEffect(() => {
    let upCount = 0
    let downCount = 0
    props.data.forEach((d) => {
      if (d.ResponseStatus !== 0) {
        upCount++
      } else {
        downCount++
      }
    })

    setUpCount(upCount)
    setDownCount(downCount)
  }, [props.data]);

  const PieEChartColors = getChartColorsArray(props.dataColors);
  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Up", "Down"],
      textStyle: {
        color: ["#8791af"],
      },
    },
    color: PieEChartColors,
    series: [
      {
        name: "Up / Down Count",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          {value: upCount ? upCount : 0, name: "Up"},
          {value: downCount ? downCount : 0, name: "Down"},
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
      <ReactEcharts style={{
        height: "350px",
        width: "400px",
        marginLeft: "13rem",
        marginTop: "1rem"
      }} option={options}/>
  );
};
export default Pie;
