<template>
  <div>
    <list class="item-container" @loadmore="fetchmore" loadmoreoffset="10">   
      <header>
        <wxc-searchbar class="search" ref="search" @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput">
        </wxc-searchbar>
      </header>
      <wxc-cell v-for="item in listData" 
              :key="item.housing_resources_id" 
              :has-arrow="false"
              :cell-style="cellStyle"
              :has-top-border="false"
              :auto-accessible="false"
              @wxcCellClicked='wxcCellClicked(item.housing_resources_id)'>
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
  </div>
</template>

<script>
var stream = weex.requireModule('stream');
var modal = weex.requireModule('modal')
var navigator = weex.requireModule('navigator')
var page = 0;
var page_size = 10;
var keywords = '';
import { WxcSearchbar, WxcCell } from 'weex-ui'

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
  components: { WxcSearchbar, WxcCell },
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
    wxcCellClicked (element) {
        this.$router.push({ path:'detail', query: { id: element}});
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
</style>