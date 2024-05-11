# uniapp-天气

使用技术：

ucharts图表库+Uview框架+VUE

使用的接口：

免费-和风天气API,高德地图API

## 效果预览：

![image-20240512012615670](https://github.com/Javahhhh/uniapp_weather/assets/112531492/3692fa36-1d39-4f69-a636-2c0ad73d6b08)
![image-20240512012559932](https://github.com/Javahhhh/uniapp_weather/assets/112531492/0ab1558c-73c4-49d5-b3a5-3901d1089228)



视频：https://www.douyin.com/user/self?modal_id=7362522108699692322&showTab=post



## 安装环境：


![image-20240512013001192](https://github.com/Javahhhh/uniapp_weather/assets/112531492/acc2de46-1f72-4b6c-8a14-261e6b6419f4)



## 包含功能：

1. 实时天气数据：应用程序需要能够获取当前位置的实时天气数据，包括温度、湿度、风速、风向、降水概率。
2. 多地点支持：用户可以添加多个地点，并查看每个地点的天气情况，这对于旅行者或者需要关心多个地点天气的人来说很重要。
3. 天气预报：提供未来几天的天气预报，让用户可以提前了解天气变化，包括每日的最高温度、最低温度、天气情况等。
4. 天气图表和趋势：通过图表展示天气趋势，如温度变化、降水量变化等，帮助用户更直观地理解天气变化。
5. 天气警报和提醒：当有重要的天气变化时，比如暴风雨、雷暴、大雾等，向用户发送通知提醒，确保用户的安全。
6. 日出日落时间：
7. 显示每天的日出和日落时间，帮助用户了解白天的长短以及光照时间。
8. 空气质量指数：提供空气质量指数（AQI）以及相关的空气污染信息，让用户了解当前空气质量情况。-https://dev.qweather.com/docs/api/air/air-now/
9. 交互性地图：结合地图功能，用户可以在地图上查看不同地区的天气情况，并且可以进行交互操作，如放大、缩小、拖动等。
   
   

# 看和风文档技巧：

![image-20240512012119992](https://github.com/Javahhhh/uniapp_weather/assets/112531492/5a40a87f-c228-4b46-9216-aaf8d9bae59e)


多使用这个参数，开发会快很多

# 实现过程：

## 实现页面跳转：

需要在[pages.json](https://uniapp.dcloud.net.cn/collocation/pages#pages)里配置每个路由页面的路径及页面样式

```
<button @click="navigateToPage">跳转到新页面</button>
 methods: {  
	navigateToPage() {
	      uni.navigateTo({
	        url: '/pages/home/home'
	      });
	    }
    },
    
    
```
![image-20240414093743225](https://github.com/Javahhhh/uniapp_weather/assets/112531492/ac4834a8-6245-4ea2-9026-501f8154594d)
![image-20240414093811357](https://github.com/Javahhhh/uniapp_weather/assets/112531492/6d0408e4-f23a-4fb9-bfc4-2ffcd60e55fd)





底部导航栏跳转：

第一步：
![image-20240414094121819](https://github.com/Javahhhh/uniapp_weather/assets/112531492/b98b969f-0656-4790-a17b-46e7ab0fd9e4)
![image-20240414093922149](https://github.com/Javahhhh/uniapp_weather/assets/112531492/4ace5b1f-e33e-45dd-bf3b-67f711be825f)


第二步：代码

```
 <u-tabbar-item   
        text="首页"   
        icon="home"   
        @click="click1"  
      ></u-tabbar-item> 
  // js部分     
  methods: {  
    click1() {
        // 调用 uni.navigateTo 实现页面跳转
        uni.navigateTo({
          url: '/pages/weather/weather'
        });
      },     
      
```






## 实时天气：

先获取城市id,

url: `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(this.keyword)}&key=bf134d65ec4946b2af4f853509caa114`,

## 地图交互：

地图 JS API 2.0 +vue

https://blog.csdn.net/weixin_51526447/article/details/136458350



# 



