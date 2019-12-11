export default function pieSellGetData (data, title, type) {
  var color = ['#8d7fec','#5085f2','#e75fc3','#f87be2','#f2719a','#fca4bb','#f59a8f','#fdb301','#57e7ec','#cf9ef1','#57e7ec','#cf9ef1']
  var datas = [];
  if (type === 'cash') {
    data.map((val) => {
      datas.push({value: val.sales,cashName: val.cashName,id:val.id})
    })
  } else {
    data.map((val) => {
      datas.push({value: val.sumBill,cashName: val.userName,id:val.userId})
    })
  }
  return  {
    /*title: [
      {
        text: '标题',
        textStyle: {
          fontSize: 16,
          color: "black"
        },
        left: "2%"
      },
      {
        text: '合计',
        subtext: 12312+'个',
        textStyle:{
          fontSize:20,
          color:"black"
        },
        subtextStyle: {
          fontSize: 20,
          color: 'black'
        },
        textAlign:"center",
        x: '34.5%',
        y: '44%',
      }],*/
    tooltip: {
      trigger: 'item',
      formatter:function (parms){
        let str = `<p class="text-left">
        ${parms.seriesName}</br>
        营业员名字：${parms.data.cashName}</br>
        ${type==='cash'?'收入：':'订单数：'}：${parms.data.value}</br>
        占比：${parms.percent}%
</p>
       
        `
        return  str ;
      }
    },
    series: [
      {
        name:title,
        type:'pie',
        center: ['center', 'center'],
        radius: ['40%', '65%'],
        color: type==='cash'?color:color.reverse(),
        clockwise: false, //饼图的扇区是否是顺时针排布
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'outter',
            formatter:function (parms){
              return `${parms.data.cashName}（${parms.data.value}${type==='cash'?'元':'单'}）`
            }
          }
        },
        labelLine: {
          normal: {
            length:50,
            length2:50,
            smooth:false,
          }
        },
        data:datas
      }
    ]
  };
}
