export default function barTopGetData (data, y_data) {
  return {
    title: {
      text: '店铺销售额排名',
      left: 'center'
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: '10%',
      left: '1%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: {show: false},
      axisLabel: {
        formatter: '{value}'
      },
      nameTextStyle: {
        color: 'white'
      },
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
    },
    yAxis: {
      type: 'category',
      inverse: false,
      splitLine: {show: false},
      data: y_data.reverse(),
      axisLabel: {
        margin: 20,
      },
      nameTextStyle: {
        color: 'white'
      },
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
    },
    series: [
      {
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
          }
        },
        barWidth: '30px',
        data: data.reverse(),
      }
    ]
  }
}
