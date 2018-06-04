<template>
  <!-- <list class="list" @loadmore="fetch" loadmoreoffset="10">
    <cell class="cell" v-for="num in listData" :key="num.housing_resources_id">
      <div class="panel">
        <text class="text">{{num.cover}}</text>
      </div>
    </cell>
  </list> -->
  <list class="container" @loadmore="fetchmore" loadmoreoffset="10">  
      <header>
        <wxc-searchbar class="search" ref="search" @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput">
        </wxc-searchbar>
      </header>
      <!-- <cell class="cell" v-for="num in listData" :key="num.housing_resources_id"> -->
        <!-- <div class="panel">
          <text class="text">{{num.cover}}</text>
        </div> -->
        <!-- <wxc-pan-item url="https://h5.m.taobao.com/trip/ticket/detail/index.html?scenicId=2675"
                      @wxcPanItemPan="wxcPanItemPan"> -->
        <!-- <wxc-item image="https://gw.alicdn.com/i1/2935198750/TB26GMgeOC9MuFjSZFoXXbUzFXa_!!2935198750.jpg"
                  image-text='test'
                  title="卡片测试｜四川成都出发到九寨沟牟尼沟 温泉3天2晚纯玩跟团旅游"
                  desc="sd"
                  tags="tags"
                  price="666"
                  price-desc="月售58笔｜999+条评论"/></wxc-item> -->
        <!-- </wxc-pan-item> -->
      <!-- </cell> -->
      <wxc-cell v-for="item in listData" 
                :key="item.housing_resources_id" 
                :has-arrow="false"
                :cell-style="cellStyle"
                :has-top-border="false"
                :auto-accessible="false"
                @wxcCellClicked="wxcCellClicked">
        <image class="image"
                slot="label"
                :src="item.cover"></image>
        <text class="title"
              slot="title">{{item.community}}
        </text>
        <text class="price" 
              slot="value">¥{{item.month_rent}}
        </text>
      </wxc-cell>
  </list>
</template>

<script>
var stream = weex.requireModule('stream');
var modal = weex.requireModule('modal')
var page = 0;
var page_size = 10;
var keywords = '';
import { WxcSearchbar, WxcCell, WxcPanItem } from 'weex-ui';
import WxcItem from './wxc-item.vue';

let BaseURLString = 'http://www.yuejuweb.com/wechatapi/0/houses/';

function query(URLString, parameter, callback) {
  if (JSON.stringify(parameter) != '{}') {
    URLString += '?'
  }
  var parameterList = new Array();
  for (var key in parameter) { 
     parameterList.push(key + '=' + parameter[key])
  }
  URLString += parameterList.join('&');
  stream.fetch({
      method: 'GET',
      url: URLString,
      type:'json'
      }, function(ret) {
        var result = ret.data.data.housing_resources;
        if (typeof callback=='function') {
          callback(result);
        }
     });
}

module.exports = {
  components: { WxcSearchbar, WxcCell, WxcPanItem },
  name: 'App',
  data: function () {
      return {
        listData: ''
      }
    },
  created: function() {
    var me = this;
    var parameter = {'page': page, 'page_size': 10};
    var cb = function(result) {
      me.listData = result;
    }
    query(BaseURLString, parameter, cb);
  },
    methods: {
      wxcCellClicked (e) {
        console.log('cellTap');
      },
      fetchmore(event) {
        var me = this;
        var parameter = {'page': ++page, 'page_size': 10, 'keywords': keywords};
        var cb = function(result) {
          if (result.length > 0) {
            me.listData = me.listData.concat(result);
          } else {
            modal.toast({
              message: '没有更多了',
              duration: 2
            })
          }
        }
        query(BaseURLString, parameter, cb);
      },
      wxcSearchbarInputOnInput (e) {
        var me = this;
        page = 0;
        keywords = e.value;
        var parameter = {'page': page, 'page_size': 10, 'keywords': e.value};
        var cb = function(result) {
          me.listData = result;
        }
        query(BaseURLString, parameter, cb);
      },
      wxcPanItemPan (e) {
        alert('push');
      }
    }
}
</script>

<style scoped>
  .title {
    font: 30px;
    width: 400px;
    flex-direction: column;
    justify-content: center;
  }
  .image {
    width: 200px;
    height: 150px;
    margin-right: 20px;
  }
  .price {
    width: 100px;
    font: 20px;
    color: orange;
  }
  .banner {
    width: 750px;
    padding: 25px;
    font-size: 60px;
    text-align: center;
    font-weight: bold;
    color: #41B883;
    background-color: rgb(162, 217, 192);
  }
  .panel {
    width: 600px;
    height: 300px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
