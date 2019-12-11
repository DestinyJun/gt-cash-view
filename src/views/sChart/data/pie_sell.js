export default function pieSellGetData (data, title) {
  const colorList = []
  data.map((val) => {
    var r=Math.floor(Math.random()*200);
    var g=Math.floor(Math.random()*200);
    var b=Math.floor(Math.random()*200);
    colorList.push("rgb("+r+','+g+','+b+")")
  })
  return {
    title: {
      text: `${title}`,
      x: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}元({d}%)'
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        color: colorList,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          align: 'center',
          emphasis: {
            show: true,
            textStyle: {
              fontSize: 12
            }
          }
        },
        data: data,
        itemStyle: {
          color: function (params) {
            return colorList[params.dataIndex];
          },
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
