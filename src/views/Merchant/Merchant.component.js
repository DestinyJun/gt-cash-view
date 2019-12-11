import Header from '@/components/Header.vue'
import ECharts from 'vue-echarts'
// bar组件
import 'echarts/lib/chart/pie'
// tooltip legend title 组件
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
// registering custom theme
import theme from './theme.json'

ECharts.registerTheme('ovilia-green', theme)
// chart data
import pieSellGetData from './data/pie_sell'

// date
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/zh-cn';
import moment from 'moment'

export default {
  name: 'Merchant',
  components: {
    Header,
    'v-chart': ECharts,
    DatePicker
  },
  data () {
    return {
      d_start_date:moment(new Date(new Date(new Date('2019-12-09 00:00:00').toLocaleDateString()).getTime())).format('YYYY-MM-DD HH:mm:ss'), // 选择开始时间
      d_end_date: moment(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)).format('YYYY-MM-DD HH:mm:ss'), // 选择结束时间
      d_cashPie: null, // 销售额柱状图配置
      d_billPie: null, // 订单数柱状图配置
      d_selected: -1, // 选择店员
      d_options: [
        // 店员列表
        { value: -1, text: '所有人' },
      ],
      d_fields: [
        // 商品统计字段
        {key: 'goodsName',label: '商品名称'},
        {key: 'unitPrice',label: '单价'},
        {key: 'number',label: '数量'},
        {key: 'date',label: '成交时间'},
      ],
      d_items: [
        //  商品统计数据
        // { goodsName: '小辣狗', number: 1829, unitPrice: '2019-12-05 13:05' },
      ],
      d_billGroup: {
        firstBill: null,
        lastBill: null,
      }
    }
  },
  methods: {
    // 时间改变函数
    dateChange (e,type) {
      if (type === 'start') {
        this.d_start_date = e
      } else {
        this.d_end_date = e
      }
      this.getMerchantData()
    },
    // 选择收银c员
    cashierChange() {
      this.getMerchantData();
    },
    // 获取饼状图数据以及商品排名列表
    getMerchantData() {
      // 获取时间段统计饼状图数据
      this.post('/dataview/timeStatistics/getInfo', {
        startTime: this.d_start_date,
        endTime: this.d_end_date,
        cashId: this.d_selected,
        merchantCode: this.$route.query.merchantCode
      })
        .then((res) => {
          this.d_cashPie = pieSellGetData(res.data.pieChartList,'收银员营业额占比','cash')
          this.d_billPie = pieSellGetData(res.data.tital.billGroup,'收银员营业订单占比','bill')
          this.d_billGroup.firstBill = res.data.tital.firstBill
          this.d_billGroup.lastBill = res.data.tital.lastBill
        })
        .catch(()=>{
          this.d_cashPie = {}
          this.d_billPie = {}
        })

      // 获取销售商品排名列表数据
      this.post('/dataview/getGoodsTable', {
        startTime: this.d_start_date,
        endTime: this.d_end_date,
        cashId: this.d_selected,
        merchantCode: this.$route.query.merchantCode,
        pageNum:"1",
        pageSize:"10000",
      })
        .then((res) => {
          this.d_items = res.data
        })
        .catch(()=>{})
    }
  },
  created () {
    // 获取店铺人员列表
    this.post('/dataview/getCashNameList',{merchantCode: this.$route.query.merchantCode})
      .then((res) => {
        res.data.map((val) => {
          this.d_options.push({value:val.cashId,text:val.cashName})
        })
      })
    this.getMerchantData();
  }
}
