<template>
  <scroller>
    <div style="background-color: white;">
      <wxc-minibar :title="detailData.community" background-color="#F2F3F4" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"></wxc-minibar>
      <slider class="slider" auto-play="true" show-indicators="true">
        <div class="frame" v-for="picture in detailData.pictures" :key="picture">
          <image class="image" :src="picture"/>
        </div>
      </slider>
      <div>
        <div class="flex-container">
          <text class="price">¥{{detailData.month_rent}}/月</text>
          <text class="method">{{detailData.lease}}</text>
        </div>
        <text class="title">{{detailData.community}}</text>
      </div>
      <div class="flex-container">
        <image class="icon-image" style="margin-left: 20px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528131615848&di=2c402144e63752999b2693590e8ab273&imgtype=0&src=http%3A%2F%2Fwww.8887.tv%2Fupload%2F201612%2F14%2F201612141739150283.jpg"></image>
        <text class="desc-title">{{detailData.subway}};{{detailData.bus}}</text>
      </div>
      <div class="container">
        <text class="detail-title">房源介绍</text>
        <text class="detail-content">{{detailData.content}}</text>
      </div>
      <div class="container">
        <text class="detail-title">基础设施</text>
        <div class="infrastructures-container">
          <div class="infrastructures-item" v-for="(value, index) in detailData.infrastructures" :key="index" v-if="index<5">
            <image style="width: 80px; height: 80px;" :src="value.cover"></image>
            <text style="width: 130px; height: 30px; text-align: center; font-size: 20px;">{{value.name}}</text>
          </div>
        </div>
        <div class="infrastructures-container">
          <div class="infrastructures-item" v-for="(value, index) in detailData.infrastructures" :key="index" v-if="index>=5 && index<10">
            <image style="width: 80px; height: 80px;" :src="value.cover"></image>
            <text style="width: 130px; height: 35px; text-align: center; font-size: 20px;">{{value.name}}</text>
          </div>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import { WxcMinibar } from 'weex-ui';
var stream = weex.requireModule('stream');

module.exports = {
  components: { WxcMinibar },
  name: 'App',
    data: function () {
        return {
          detailData: ''
        }
      },
    created: function() {
      var me = this;
      stream.fetch({
      method: 'GET',
      url: 'http://www.yuejuweb.com/wechatapi/0/house/?housing_resources_id='+this.$route.query.id,
      type:'json'
      }, function(ret) {
        var result = ret.data.data.house;
        me.detailData = result;
      });
    },
  methods: {
    minibarLeftButtonClick () {
      
    },
  }
}
</script>

<style scoped>
  .image {
    width: 750px;
    height: 600px;
  }
  .icon-image {
    width: 50px;
    height: 50px;
  }
  .slider {
    width: 750px;
    height: 600px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
  .frame {
    width: 750px;
    height: 600px;
    background-color: black;
  }
  .flex-container {
    margin-top: 30px;
    flex-direction: row;
    align-items: center;
  }
  .price {
    margin-left: 20px;
    margin-right: 20px; 
    font-size: 55px;
    color: black;
    font-weight: bold;
  }
  .method {
    margin-left: 20px;
    font-size: 30px;
    width: 100px;
    height: 50px;
    color: orange;
    border-color: orange;
    border-width: 2px;
    padding-left: 15px;
  }
  .title {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 50px;
    color: black;
  }
  .container {
    margin-top: 30px;
    border-top-color: #f5f5f5;
    border-top-width: 2px;
  }
  .detail-title {
    font-size: 35px;
    color: black;
    margin-left: 20px;
    margin-top: 30px;
    margin-right: 20px;
  }
  .detail-content {
    font-size: 30px;
    color: lightslategray;
    margin-left: 20px;
    margin-top: 30px;
    margin-right: 20px;
  }
  .desc-title {
    font-size: 25px;
    color: black;
    margin-left: 10px;
  }
  .infrastructures-container {
    flex-direction: row; 
    align-items: center; 
    margin-top: 30px; 
    margin-left: 20px; 
    margin-right: 20px; 
    margin-bottom: 30px;
  }
  .infrastructures-item {
    width: 50px;
    height: 50px;
    flex-direction: columns; 
    align-items: center; 
    width: 135px; 
    height: 135px;
  }
</style>