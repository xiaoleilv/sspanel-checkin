# 通用机场签到
>只要机场网站''' Powered by SSPANEL ''',就可以进行签到。要确认是否是''' Powered by SSPANEL '''，在机场首页滑倒最底端就可以看到。例如：
![Y0}SY$J`8837H8T5GXM1DZY](https://user-images.githubusercontent.com/21276183/214764546-4f66333a-cb9b-420e-8260-697d26fb4547.png)
## 作用
>每天进行签到，获取额外的流量奖励

## 推送方式
  🚀🚀该脚本采用的是<a href = 'https://sct.ftqq.com/'>Server酱</a>的推送方式，脚本中SCKEY设置为Server酱的APPKEY，不需要推送请留空；

# 部署过程

1. 使用青龙脚本或其他脚本管理应用，本文使用的青龙脚本仅供参考；

2. 克隆或这保存”sspanel-checkin.js“到青龙脚本-脚本管理中；

3. 在环境变量中新建环境变量：SSPUser,环境变量值为JSON，示例如下：

   ```json
   [{
   	"url":"https://jichang.com", //机场地址，例如：https://example.com</b>,尾部不要加 / 号
   	"email":"XXXXX@qq.com", //登录邮箱
   	"passwd":"XXXX123456"	//账号密码
    }]	
   ```

4. 定时任务中新增任务，命令/脚本如下：

   ```
   task sspanel-checkin.js
   ```

   
