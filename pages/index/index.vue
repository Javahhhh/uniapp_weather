<template>
	<scroll-view scroll-y="true" class="scroll-view">
		<view class="weather-container" style="overflow-y: auto;">
			<u-search v-model="keyword" @clickIcon="clickIcon"></u-search>
			<view class="top-info">
				<text class="location">地区：{{ weatherData.location }}</text>
				<text class="temperature">{{ weatherData.temperature }}°C</text>
				<image class="weather-icon" :src="weatherData.iconUrl"></image>

				<text class="wind">{{ weatherData.windDir }}</text>
				<text class="wind">风速：{{ weatherData.windSpeed }}公里/小时 </text>
			</view>
			<view class="additional-info">
				<text>降水量: {{ weatherData.precipitation }}mm</text>
				<text>湿度: {{ weatherData.humidity }}%</text>
			</view>


		</view>
		<u-divider>划分线</u-divider>
		<view class="weather-buttons ios-style">
			<u-button size="default" class="ios-btn tomorrow" @click="navigateToTomorrow">预警
				<image class="weather-icon" :src="weatherIconPath"></image>

			</u-button>
			<u-button size="default" class="ios-btn after-tomorrow" @click="air_quality">空气质量
				<image class="weather-icon" :src="weatherIconPath2"></image>
			</u-button>
		</view>
		<u-line color="bule" />
		<!-- 折线图 -->
		<view>
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
		<u-divider>划分线</u-divider>

		<view>
			<qiun-data-charts type="line" :opts="sunopt" :chartData="chartsunData" />
		</view>

		<u-tabbar :value="currentTab" @change="change1" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="click1"></u-tabbar-item>
			<u-tabbar-item text="地图" icon="map" @click="navigateTo('map')"></u-tabbar-item>
			<u-tabbar-item text="图表" icon="play-right" @click="navigateTo('chart')"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="navigateTo('my')"></u-tabbar-item>

		</u-tabbar>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				weatherIconPath: require('../../node_modules/qweather-icons/icons/100.svg'),
				weatherIconPath2: require('../../node_modules/qweather-icons/icons/102.svg'),
				chartData: {},
				chartsunData: {},
				sunopt: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2,
						"data": [{
							"min": 0,
							"max": 2400,

						}]
					},
					extra: {
						line: {
							type: "curve",
							width: 2,
							activeType: "hollow"
						},
					}
				},
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},

					yAxis: {
						gridType: "dash",
						dashLength: 2,
						"data": [{
							"min": 0,
							"max": 50
						}]
					},
					extra: {
						line: {
							type: "curve",
							width: 2,
							activeType: "hollow"
						},
					}
				},


				weatherData: {
					location: '',
					temperature: '',
					iconUrl: '',
					windDir: '',
					windSpeed: '',
					precipitation: '',
					humidity: '',
				},
				chartOptions: {
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						title: '温度 (°C)',
						min: 10
					},
					width: 320,
					height: 200
				}
			};
		},
		onReady() {
			this.getServerData();
			this.getSunData();
		},
		methods: {
			navigateTo(targetPage) {
				uni.navigateTo({
					url: `/pages/map/map` // 假设map.vue对应的pages目录下的完整路径是/pages/map/map
				});
			},
			navigateToTomorrow() {
				uni.getStorage({
					key: 'locationId',
					success: (result) => {
						console.log('本地存储中的 locationId 值是：', result.data);
						uni.navigateTo({
							url: `/pages/Warning_situation/Warning_situation?id=${result.data}`,
						});
					},
					fail: () => {
						console.log('未能从本地存储中获取 locationId');
					},
				})
			},

			air_quality() {
				uni.getStorage({
					key: 'locationId',
					success: (result) => {
						console.log('拿到的 locationId 值是：', result.data)
						uni.navigateTo({
							url: `/pages/air_quality/air_quality?id=${result.data}`,
						});
					}
				})

			},
			get3dData(locationId) {
				uni.request({
					url: `https://devapi.qweather.com/v7/weather/3d?location=${locationId}&key=bf134d65ec4946b2af4f853509caa114`,
					success: (res) => {
						console.log('天气数据是' + JSON.stringify(res.data));
						// 创建 categories 数组并填充 fxDate 数据
						this.categories = res.data.daily.map(item => item.fxDate);
						// 打印 categories 里面的日期数据				 
						console.log('提取的日期数据：', this.categories);
						//最高气温
						this.maxtemp = res.data.daily.map(item => item.tempMax);
						//最低气温
						this.mintemp = res.data.daily.map(item => item.tempMin);
						console.log('最高气温是：' + this.maxtemp + '最低气温是：' + this.mintemp);
						//降水量
						this.my_precip = res.data.daily.map(item => item.precip);
						//日出时间
						this.sunrise = res.data.daily.map(item => item.sunrise);


						console.log('日出时间' + this.sunrise);
						//日落时间
						this.sunset = res.data.daily.map(item => item.sunset);
						console.log('日落时间' + this.sunset);
						//刷新函数
						this.getServerData();
						this.getSunData();
					},
					fail: (error) => {
						console.error('请求失败：', error);
						uni.$u.toast('请求失败');
					}
				})
			},
			getSunData() {
				//将时间转化为数字
				const sunriseNumbers = this.sunrise.map(timeStr => {
					const timeParts = timeStr.split(':');
					return parseInt(timeParts[0]) * 100 + parseInt(timeParts[1]);
				});
				const sunsetNumbers = this.sunset.map(timeStr => {
					const timeParts = timeStr.split(':');
					return parseInt(timeParts[0]) * 100 + parseInt(timeParts[1]);
				});


				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ['今天', '明天', '后天'],
						series: [{
								name: "日出时间",
								lineType: "dash",
								data: sunriseNumbers,
							},
							{
								name: " 日落时间",
								data: sunsetNumbers,
							},

						]
					};
					this.chartsunData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			getServerData() {
				let MinTemp = this.mintemp;
				let MaxTemp = this.maxtemp;
				let precip = this.my_precip;
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ['今天', '明天', '后天'],
						series: [{
								name: "最低气温A",
								lineType: "dash",
								data: MinTemp,
							},
							{
								name: "最高气温B",
								data: MaxTemp,
							},
							{
								name: "降水量（毫米）",
								data: precip,
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},

			clickIcon() {
				this.weatherData.location = this.keyword;
				if (this.keyword.trim() === '') {
					uni.$u.toast('请先输入关键词');
				} else {
					this.getKeyword();
				}
			},
			getKeyword() {
				uni.request({
					url: `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(this.keyword)}&key=bf134d65ec4946b2af4f853509caa114`,
					success: (res) => {
						uni.$u.toast('请求成功');
						console.log(res.data);
						console.log('数据是' + JSON.stringify(res.data));
						const locationId = res.data.location[0].id;

						// 将 locationId 保存到本地同步存储
						uni.setStorageSync('locationId', locationId);
						console.log('城市ID：' + locationId)
						this.getWeatherdata(locationId); //传递ID
						this.get3dData(locationId); //将id传给未来3天函数


					},
					fail: (error) => {
						console.error('请求失败：', error);
						uni.$u.toast('请求失败，请检查关键词或网络');
					}
				});
			},
			getWeatherdata(locationId) {
				uni.request({
					url: `https://devapi.qweather.com/v7/weather/now?location=${locationId}&key=bf134d65ec4946b2af4f853509caa114`,
					success: (res) => {
						uni.$u.toast(`请求成功`);
						console.log('天气数据是' + JSON.stringify(res.data));
						this.weatherData.temperature = res.data.now.temp;
						this.weatherData.precipitation = res.data.now.precip;
						this.weatherData.humidity = res.data.now.humidity;
						this.weatherData.windDir = res.data.now.windDir;
						this.weatherData.windSpeed = res.data.now.windSpeed;
						//图标
						this.weatherData.iconUrl = require(
							`../../node_modules/qweather-icons/icons/${res.data.now.icon}.svg`)
					},
					fail: (error) => {
						console.error('请求失败：', error);
						uni.$u.toast('请求失败');
					}
				})
			}

		}
	}
</script>

<style>
	.weather-buttons {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}


	.ios-btn {
		height: 50px;
		font-size: 23px;
		border-radius: 10px;
		box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
		/* 添加阴影效果 */
		transition: all 0.3s ease;
		/* 添加过渡动画 */
		color: #fff;
		border: none;
		margin: 0 10px;
	}


	.ios-btn.tomorrow {

		background-color: #7de6a9;
		/* iOS蓝色主题 */

	}


	.ios-btn.after-tomorrow {
		background-color: #7de6a9;
		/* iOS橙色主题 */
	}

	/* 当按钮处于活动状态时的样式 */
	.ios-btn:active {
		opacity: 0.8;
		transform: translateY(1px);
	}

	.scroll-view {
		/* 设置滚动视图的高度 */
		overflow: auto;
		/* 当内容超出容器大小时，显示滚动条 */
	}


	.chart-container {
		background-color: white;
	}

	.weather-container {
		background-color: #7de6a9;
		padding: 10px;
		overflow-y: auto;
	}

	.top-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #333;
	}

	.location,
	.temperature,
	.wind {
		margin: 10px;
	}

	.temperature {
		font-size: 34px;
		/* Adjust the font size as needed */
	}

	.location {
		font-size: 23px;
		/* Adjust the font size as needed */
	}

	.weather-icon {
		width: 50px;
		height: 50px;
	}

	.additional-info {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
	}
</style>