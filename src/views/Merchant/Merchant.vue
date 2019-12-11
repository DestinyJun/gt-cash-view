<template>
  <div class="merchant">
    <Header :title="$route.name" :icon="['iconfanhui','icondianpu-copy']"></Header>
    <b-container fluid>
      <b-row class="pt-2" style="height: 6%">
        <b-col md="12">
          <b-row>
            <div class="col-12">
              <span>请选择时间段：</span>
              <date-picker
                v-model="d_start_date" type="datetime"
                value-type="format" confirm confirm-text="确认"
                format="YYYY-MM-DD HH:mm:ss"
                @confirm="dateChange($event,'start')"
              >
              </date-picker>
              <span class="ml-2 mr-2">至</span>
              <date-picker
                v-model="d_end_date" type="datetime"
                value-type="format" confirm confirm-text="确认"
                format="YYYY-MM-DD HH:mm:ss" @confirm="dateChange($event,'end')"
              >
              </date-picker>
              <span class="ml-2">收银员：</span>
              <b-form-select v-model="d_selected" :options="d_options" class="w-25" @change="cashierChange()"></b-form-select>
            </div>
          </b-row>
        </b-col>
      </b-row>
      <b-row style="height:94%">
        <b-col md="6" class="h-100 overflow-hidden">
          <div class="bg-light border mb-3 rounded shadow d-flex flex-column" style="height: calc(12% - 1rem);justify-content: center">
            <div class="w-100">
              <span class="rounded-circle bg-info d-inline-block mr-2" style="height: 10px;width: 10px"></span>
              <span>首笔订单时间：</span><span class="text-info">{{d_billGroup.firstBill}}</span>
            </div>
            <div class="w-100 mt-2 ">
              <span class="rounded-circle bg-info d-inline-block mr-2" style="height: 10px;width: 10px"></span>
              <span>尾笔订单时间：</span><span class="text-info">{{d_billGroup.lastBill}}</span>
            </div>
          </div>
          <div class="bg-light border mb-3 rounded shadow" style="height: calc(44% - 1rem)">
            <v-chart :options="d_cashPie" ref="bar" theme="ovilia-green" autoresize></v-chart>
          </div>
          <div class="bg-light border mb-3 rounded shadow" style="height: calc(44% - 1rem)">
            <v-chart :options="d_billPie" ref="bar" theme="ovilia-green" autoresize></v-chart>
          </div>
        </b-col>
        <b-col md="6" class="h-100overflow-hidden">
          <div class="shadow mb-3 overflow-auto bg-light border" style="height: calc(100% - 1rem)">
            <b-table
              hover :fields="d_fields" :items="d_items"
              head-variant="info"
            >
              <template slot="[unitPrice]" slot-scope="data">
                <b class="text-success">{{data.item.unitPrice}}</b>
              </template>
              <template slot="[number]" slot-scope="data">
                <b class="text-danger">{{data.item.number}}</b>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script src="./Merchant.component.js"></script>
<style scoped lang="scss">
  @import "Merchant.component";
</style>
