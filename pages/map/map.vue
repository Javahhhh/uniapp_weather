<template>
  <view class="container">
    <view id="map-container" class="map-container"></view>
    <view class="info" id="text">请用鼠标在地图上操作试试</view>
	
    <view class="input-card" style="width:16rem">
   <!--   <text class="title">地图点击相关事件</text> -->
				<view class="showweatherdata" id="weatherdata">
				  <text class="province">省份</text>
				  <text class="city">城市</text>
				  <text class="weather">天气</text>
				  <text class="temperature">气温</text>
				  <text class="winddirection">风向</text>
				  <text class="windpower">风力级别</text>
				  <text class="humidity">空气湿度</text>
				  <text class="reporttime">数据发布时间</text>
				</view>
      
    </view>
	
  </view>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      marker: null,
      ilon: 114.468668,
      ilat: 38.03703,
	  weather: {
	        province: '',	
	        city: '',	
	        weather: '',
	        temperature: '',
	        winddirection: '',
	        windpower: '',
	        humidity: '',
	        reporttime: '',
	      }	,
		  
    };
  },
  mounted() {
    this.initMap();
	 
  },
  methods: {
    initMap() {
      // 创建AMap实例
      this.map = new AMap.Map("map-container", {
        zoom: 13
      });

      // 创建点标记
      this.marker = new AMap.Marker({
        icon: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: [this.ilon, this.ilat],
        offset: new AMap.Pixel(-25, -60)
      });

      // 设置地图中心和缩放级别
      this.map.setZoomAndCenter(13, [this.ilon, this.ilat]);

      // 在地图上添加点标记
      this.map.add(this.marker);

      // 绑定地图事件
      this.map.on("click", this.handleMapClick);
      this.map.on("dblclick", this.handleMapDblClick);
      this.map.on("mousemove", this.handleMapMove);
    },
    handleMapClick(e) {
		 console.log('执行了');
      // 处理地图单击事件
      this.map.clearMap();
      this.marker = new AMap.Marker({
        icon: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: [e.lnglat.lng, e.lnglat.lat],
        offset: new AMap.Pixel(-25, -60)
      });

      const text = `您在 [ ${e.lnglat.lng},${e.lnglat.lat} ] 的位置单击了地图！`;
      document.querySelector("#text").innerText = text;
      console.log(text);

      this.map.add(this.marker);
	  
	  // 发送逆地理编码请求
	const location = `${e.lnglat.lng},${e.lnglat.lat}`;
	console.log('adcode是'+location);
	 this.reverseGeocode(location);
    },
	
	reverseGeocode(location) {
	      const url = `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${location}&key=fb4db47811fabc41dc3ec7faee6e8cf8&radius=1000&extensions=base`;
		uni.request({
			url:url,
			success:(res)=>{
				uni.showToast({
					title:'请求成功',
					icon:'success'
				});
			const result = res.data;
			console.log('逆地理编码结果:', result);
			const adcode =result.regeocode.addressComponent.adcode
			console.log('adcode 的值:'+ adcode);
			this.Gaode_Weather(adcode);
			},
			fail:(error)=> {
				console.log('请求失败：',error);
				uni.showToast({
					title:'请求失败',
					icon:'none'
				});
			}
		})
	      
	    },
	Gaode_Weather(adcode){
		const url =`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=fb4db47811fabc41dc3ec7faee6e8cf8`;
		uni.request({
		    url: url,
		    success: (res) => {
		      const result = res.data;
		      if (result.status === "1" && result.count === "1" && result.info === "OK" && result.infocode === "10000") {
		        // 确保返回的数据状态是成功的
		        console.log('地区天气数据：', result);
		        if (result.lives && Array.isArray(result.lives)) { 
		          // 遍历 lives 数组
		          result.lives.forEach((live) => {
					document.querySelector("#weatherdata .province").innerText = `省份：${live.province}`;
				   document.querySelector("#weatherdata .city").innerText = `城市：${live.city}`;
				   document.querySelector("#weatherdata .weather").innerText = `天气：${live.weather}`;
				   document.querySelector("#weatherdata .temperature").innerText = `气温:${live.temperature}`;
				   document.querySelector("#weatherdata .winddirection").innerText = `风向：${live.winddirection}`;
				   document.querySelector("#weatherdata .windpower").innerText = `风力级别：${live.windpower}`;
				   document.querySelector("#weatherdata .humidity").innerText = `空气湿度:${live.humidity}`;
				   document.querySelector("#weatherdata .reporttime").innerText = `数据发布时间:${live.reporttime}`;
					  
		            console.log('天气详情：', live); 
		          });
		        }
		      } else {
		        console.error('天气数据请求失败：', result);
		      }
		    },
		    fail: (err) => {
		      console.error('请求天气数据失败：', err);
		    }
		  });
	},	
    handleMapDblClick(e) {
      // 处理地图双击事件
      const text = `您在 [ ${e.lnglat.lng},${e.lnglat.lat} ] 的位置双击了地图！`;
      document.querySelector("#text").innerText = text;
    },
    handleMapMove() {
      // 处理地图鼠标移动事件
      const text = "您移动了您的鼠标！";
      document.querySelector("#text").innerText = text;
    },
    bindEvent() {
      // 绑定地图事件
      this.map.on("click", this.handleMapClick);
      this.map.on("dblclick", this.handleMapDblClick);
      this.map.on("mousemove", this.handleMapMove);
    },
    unbindEvent() {
      // 解绑地图事件
      this.map.off("click", this.handleMapClick);
      this.map.off("dblclick", this.handleMapDblClick);
      this.map.off("mousemove", this.handleMapMove);
    }
  }
};
</script>

<style scoped>

/* 卡片容器样式 */
.showweatherdata {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 4列 */
  grid-gap: 10px; /* 网格间距 */
  padding: 20px; /* 内边距 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 轻微的阴影，模拟卡片效果 */
  margin: 20px; /* 外边距 */
}

/* 文本样式 */
.showweatherdata text {
  font-size: 16px; /* 字体大小 */
  color: #333; /* 字体颜色 */
  line-height: 1.5; /* 行高 */
  margin-bottom: 5px; /* 下边距 */
}

/* 每行的最后一个元素不显示下边距 */
.showweatherdata text:last-child {
  margin-bottom: 0;
}

/* 为每一行添加额外的间距，实现 2 行布局 */
.showweatherdata text:nth-child(-n+8) {
  margin-bottom: 20px; /* 行间距 */
}

/* 绿色调主题颜色 */
.showweatherdata .province,
.showweatherdata .city,
.showweatherdata .weather,
.showweatherdata .temperature,
.showweatherdata .winddirection,
.showweatherdata .windpower,
.showweatherdata .humidity,
.showweatherdata .reporttime {
  color: #2e7d32; /* 主题绿色 */
  border-left: 4px solid #43a047; /* 边框颜色 */
  padding-left: 10px; /* 内边距 */
}

/* 媒体查询，适应小屏幕设备 */
@media (max-width: 768px) {
  .showweatherdata {
    grid-template-columns: repeat(2, 1fr); /* 在小屏幕上改为 2 列 */
  }
}

	
.container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#map-container {
  flex: 1;
}

.info {
  padding: 10px;
  text-align: center;
  background-color: #f0f0f0;
}

.input-card {
  padding: 10px;
  margin-top: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.btn {
  padding: 5px 10px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
