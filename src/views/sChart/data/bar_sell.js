export default function barSellGetData (data, x_data, title) {
  return {
    title: {
      text: `服务区销售额统计`,
      left: 'center'
    },
    legend: {},
    tooltip: {
      formatter: function (params ) {
        return `<span>时间：${params.name}</span>;<span class="ml-3">总收益：${params.value}元</span>`
      }
    },
    grid: {
      left: '8%',
      right: '3%',
      bottom: '6%'
    },
    xAxis: {
      type: 'category',
      data: x_data
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: data,
        barWidth: '30px'
      }
    ]
  }
}
