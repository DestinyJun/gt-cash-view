export default function barTopProGetData(name,value) {
  const myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
  const area = ['贵州', '云南', '四川', '重庆', '青海', '陕西', '宁夏', '江西', '安徽', '河南'];
  let data = [];
  value.map((val) => {
    data.push(parseFloat(val))
  })
  data = data.reverse();
  const maxValue = Math.max.apply(null,data);
  const yRanking = [];
  const barCircle = [];
  const barBorder = [];
  const barBgc = [];
  const barColor = [];
  for (let i = 0; i < value.length; i++) {
    // console.log((maxValue)+1050);
    yRanking.push(i);
    barCircle.push(0);
    barBorder.push(parseFloat(maxValue));
    barBgc.push(parseFloat(maxValue));
    barColor.push(myColor[i]);
  }
  // console.log(barBorder);
  // console.log(barBgc);
  return {
    title: {
      text: '商品销售额排名',
      textStyle: {
        color: '#666666',
      },
      left: 'center'
    },
    grid: {
      left: '8%',
      top: '6%',
      right: '0%',
      bottom: '0',
      containLabel: true
    },
    xAxis: [
      {show: false}
    ],
    yAxis: [
      // 区域
      {
        axisTick: 'none',
        axisLine: 'none',
        offset: '27',
        axisLabel: {
          textStyle: {
            color: '#999999',
            fontSize: '12',
          }
        },
        data: name
      },
      // 排名
      {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
          textStyle: {
            color: '#ffffff',
            fontSize: '12',
          }
        },
        data: yRanking.reverse()
      },
      // 收入
      {
        name: '收入TOP 10',
        nameGap: '50',
        nameTextStyle: {
          color: '#ffffff',
          fontSize: '12',
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)'
          }
        },
        data: [],
      }
    ],
    series: [
      {
        name: '显示值的色条',
        type: 'bar',
        yAxisIndex: 0,
        data: data,
        label: {
          normal: {
            show: true,
            position: ['50%', '0'],
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
            },
            formatter: function (param) {
              return param.value + '(元)';
            }
          }
        },
        barWidth: 10,
        itemStyle: {
          normal: {
            color: function (params) {
              const num = myColor.length;
              return myColor[params.dataIndex % num];
            },
          }
        },
        z: 2
      },
      {
        name: '背景黑色填充条',
        type: 'bar',
        yAxisIndex: 1,
        barGap: '-100%',
        data: barBgc,
        barWidth: 16,
        itemStyle: {
          normal: {
            color: '#0e2147',
            barBorderRadius: 5,
          }
        },
        z: 1
      },
      {
        name: '外圈的染色框',
        type: 'bar',
        yAxisIndex: 2,
        barGap: '-100%',
        data: barBorder,
        barWidth: 18,
        itemStyle: {
          normal: {
            color: function (params) {
              const num = barColor.length;
              return barColor[params.dataIndex % num];
            },
            barBorderRadius: 5,
          }
        },
        z: 0
      },
      {
        name: '起点的圆圈',
        type: 'scatter',
        hoverAnimation: false,
        data: barCircle,
        yAxisIndex: 2,
        symbolSize: 24,
        itemStyle: {
          normal: {
            color: function (params) {
              const num = barColor.length;
              return barColor[params.dataIndex % num];
            },
            opacity: 1,
          }
        },
        z: 2
      }
    ]
  };
}
