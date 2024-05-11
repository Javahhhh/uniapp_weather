<template>
	
 <view class="page">
	  <image class="air_Icon" :src="air_Icon" ></image>
    <h2 class="title">空气质量指数</h2>
    <view class="aqi">{{ airData.aqi }}</view>
    <view class="air-quality-container">
      <view class="info-row">
        <view class="info-item" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          指数等级：{{ airData.level }}
        </view>
        <view class="info-item" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          类别：{{ airData.category }}
        </view>
        <view class="info-item" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          首要污染物：{{ airData.primary }}
        </view>
      </view>
      <view class="info-row">
        <view class="info-item" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          PM10：{{ airData.pm10 }}
        </view>
        <view class="info-item" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          PM2.5：{{ airData.pm2p5 }}
        </view>
        <view class="info-item" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          二氧化氮：{{ airData.no2 }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				air_Icon: require('../../node_modules/qweather-icons/icons/515.svg'),
				locationId: '',
				airData:{}
			}
		},
		onLoad(options) {
			if(options.id){
				this.locationId =options.id;
				this.getAirData(this.locationId);
			}
		},
		methods: {
			getAirData(locationId){
				uni.request({
					url:`https://devapi.qweather.com/v7/air/now?location=${locationId}&key=bf134d65ec4946b2af4f853509caa114`,
					 success:(res)=> {
						 console.log('空气质量：'+JSON.stringify(res.data));
						this.airData = res.data.now;
					 	
					 }
				})
			},
			 handleMouseOver(event) {
      event.target.style.color = '#fff'; /* 鼠标移入时改变文字颜色为白色 */
    },
    handleMouseLeave(event) {
      event.target.style.color = '#3a3a3a'; /* 鼠标移出时恢复文字颜色为深灰色 */
    }
			
		}
	}
</script>

<style>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #e0f2e9; /* 淡绿色背景，森林系色彩 */
  color: #ffffff; /* 文字颜色为深灰色 */
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #608d4f; /* 标题文字颜色为森林绿色 */
}

.aqi {
  font-size: 72px;
  font-weight: bold;
  color: #3b8637; /* AQI 数值颜色为深绿色 */
  margin-bottom: 30px;
}

.air-quality-container {
  width: 80%;
  max-width: 600px;
  background-color: #c7e4c7; /* 容器背景色，森林系淡绿色 */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-item {
  flex-basis: calc(33.33% - 10px); /* 每个信息项占据父容器的 33.33% 宽度 */
  padding: 20px;
  border-radius: 8px;
  background-color: #80c597; /* 信息项背景色，淡绿色 */
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease; /* 添加过渡效果 */

}


.info-item:hover {
  transform: scale(1.15); /* 鼠标移入时略微放大 */
  background-color: #74a865; /* 鼠标移入时改变背景色 */
}
</style>
