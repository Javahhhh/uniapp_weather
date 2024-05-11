<template>
   <view class="page">
	   <image class="weather-icon" :src="weatherIcon2" ></image>
        <h2>该地区预警情况</h2>
        <view class="weather-warning" v-if="warning">
            <view class="warning-item warning-sender" v-if="warning.sender"> 预警发布单位：{{ warning.sender }}</view>
            <view class="warning-item warning-pubtime" v-if="warning.pubTime">预警发布时间 ：{{ warning.pubTime }}</view>
            <view class="warning-item warning-title" v-if="warning.title">预警信息标题 ：{{ warning.title }}</view>
            <view class="warning-item warning-starttime" v-if="warning.startTime">预警开始时间：{{ warning.startTime }}</view>
            <view class="warning-item warning-endtime" v-if="warning.endTime"> 预警结束时间：{{ warning.endTime }}</view>
            <view class="warning-item warning-level" v-if="warning.level"> 等级：{{ warning.level }}</view>
            <view class="warning-item warning-type-name" v-if="warning.typeName">类型名称：{{ warning.typeName }}</view>
            <view class="warning-item warning-text" v-if="warning.text">详细文字描述：{{ warning.text }}</view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				weatherIcon2: require('../../node_modules/qweather-icons/icons/1009.svg'),
				 locationId: '',
				 warning:{}
			};
		},
		onLoad(options) {
			if(options.id){
		    this.locationId = options.id;
			this.getwarningData(this.locationId);

			}
		  },
		methods: {
			getwarningData(locationId){
				uni.request({
					url:`https://devapi.qweather.com/v7/warning/now?location=${locationId}&lang=zh&key=bf134d65ec4946b2af4f853509caa114`,
					 success:(res)=> {
						 console.log('预警信息是'+JSON.stringify(res.data));
						  this.warning = res.data.warning[0];		
					 	
					 }
				})
			},
		}
	}
</script>

<style>
.weather-icon {
    width: 87px;
    height: 80px;
}	
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: white; /* 白色背景 */
    color: #333; /* 深灰色文字，增强可读性 */
    font-family: 'Arial', sans-serif;
    padding: 20px;
}

.weather-warning {
    width: 90%;
    background-color: #f9f9f9; /* 浅灰色背景，减少视觉疲劳 */
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* 轻微的阴影效果 */
}

.warning-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #e8f5e9; /* 森林绿的浅色调 */
    border-radius: 10px;
}

.warning-title, .warning-text {
    font-weight: bold;
    color: #2e7d32; /* 森林绿 */
}

.warning-sender, .warning-pubtime, .warning-starttime, .warning-endtime, .warning-level, .warning-type-name {
    font-size: 0.9em;
    color: #4e342e; /* 棕色，用于显示次要信息 */
}

.warning-item:hover {
  color: #007bff; /* 鼠标悬停时文本颜色变为深蓝色 */
}

.warning-item:hover {
  background-color: #e0f7ff; /* 浅蓝色背景 */
  cursor: pointer; /* 更改鼠标形状为手形，表示可交互 */
}

.warning-item:hover {
  transform: scale(1.05); /* 变大5% */
  transition: transform 0.2s ease-in-out; /* 添加平滑过渡动画 */
}

.warning-item:hover {
  color: #007bff;
}
</style>
