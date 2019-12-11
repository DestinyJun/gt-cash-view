import Header from '@/components/Header.vue'
import ECharts from 'vue-echarts'
// bar组件
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/chart/scatter'
// tooltip legend title 组件
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
// registering custom theme
import theme from './theme.json'
ECharts.registerTheme('ovilia-green', theme)
// chart data
import barTopGetData from './data/bar_top'
import barTopProGetData from './data/bar_topPro'
// date
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/zh-cn';
import moment from 'moment'

export default {
  name: 'MChart',
  components: {
    Header,
    'v-chart': ECharts,
    DatePicker
  },
  data () {
    return {
      d_date: moment(new Date).format('YYYY-MM-DD'),
      time1: '', //
      d_barSell: null, // 销售额柱状图配置
      d_barTop: null, // 店铺排名柱状图配置
      d_barTopPro: null, // 商品排名柱状图配置
      d_orderCountTitle: null, // 订单统计弹窗标题
      // 订单统计表格字段
      d_orderCountFields: [
        { index: '#' },
        { orderNumber: '订单编号' },
        { profit: '订单金额' },
      ],
      // 订单统计表格数据
      d_orderCountItems: [],
      // 订单详情表格字段
      d_orderDetailFields: [
        { index: '#' },
        { goodsName: '商品名称' },
        { number: '数量' },
        { unitPrice: '单价' },
        { profit: '总额' },
      ],
      // 订单详情表格数据
      d_orderDetailItems: []
    }
  },
  methods: {
    // 柱状图点击是事件
    barClick(event) {
      this.$router.push({
        path: '/merchant',
        query: {
          merchantCode: event.data.merchantCode
        }
      })
    },
    // 订单统计表格行点击事件
    orderCountClick(event) {
      this.post('/chart/getorderinfo', { id: event.id})
        .then((res) => {
          this.d_orderDetailItems  = res.data;
          this.$bvModal.show('order-detail');
        })
        .catch(() => {})
    },
    // 时间改变函数
    dateChange(e) {
      this.d_date = e;
      // 店铺销售排名
      this.post('/dataview/getmerchanttop',{date:this.d_date,pageNum: '1',pageSize: '10000',})
        .then((res) => {
          const y_data = [];
          const x_data = [];
          res.contents.map((val) => {
            x_data.push({value:val.allSales,merchantCode:val.merchantCode});
            y_data.push(val.merchantName);
          })
          this.d_barTop = barTopGetData(x_data,y_data);
        })
      // 商品销售排名
      this.post('/dataview/getgoodstop',{date: this.d_date})
        .then((res) => {
          this.d_barTopPro = barTopProGetData(res.data.yData,res.data.xData);
        })
    }
  },
  created() {
    // 店铺销售排名
    this.post('/dataview/getmerchanttop',{date:this.d_date,pageNum: '1',pageSize: '10000',})
      .then((res) => {
        const x_data = [];
        const y_data = [];
        res.contents.map((val) => {
          x_data.push({value:val.allSales,merchantCode:val.merchantCode});
          y_data.push(val.merchantName);
        })
        this.d_barTop = barTopGetData(x_data,y_data);
      })
    // 商品销售排名
    this.post('/dataview/getgoodstop',{date: this.d_date})
      .then((res) => {
        this.d_barTopPro = barTopProGetData(res.data.yData,res.data.xData);
      })
  }
}
