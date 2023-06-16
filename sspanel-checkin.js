const axios = require('axios');

const session = axios.create();
const users = JSON.parse(process.env.SSPUser)||[];

// server酱
const SCKEY = process.env.SCKEY||'';
for (const item of users) {
  const { url, email, passwd } = item;
  checkin(url,email,passwd);
}
//sspanel签到；
function checkin(url,email,passwd){
  const loginUrl = `${url}/auth/login`;
  const checkUrl = `${url}/user/checkin`;

  const headers = {
    'Origin': url,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
  };

  const data = {
    email: email,
    passwd: passwd
  };

  try {
    console.log('进行登录...');
    session.post(loginUrl, data, { headers })
      .then(response => {
        const cookies = response.headers['set-cookie'];
        const loginResponse = response.data;
        const newCookies = [];
        for (const item of cookies) {
          const match = item.match(/([^=]+)=(.*?);/);
          if (match) {
            const key = match[1];
            const value = match[2];
            newCookies.push(key+'='+value);
          }
        }
        headers["cookie"] = newCookies.join(';');
        // 进行签到
        session.post(checkUrl, {}, { headers })
          .then(response => {
            const checkResponse = response.data;
            const content = checkResponse.msg;
            console.log(email+checkResponse.msg);
            if(SCKEY&&SCKEY!=''){
              pushWechat(email+'签到成功',content);
            }
          })
          .catch(error => {
            console.error('签到失败:',email+error.message );
            const content = error.message;
            if(SCKEY&&SCKEY!=''){
              pushWechat(email+'签到失败',content);
            }
          });
      })
      .catch(error => {
        console.error(email+'登录失败:', error.message);
      });
  } catch (error) {
    console.error(email+'发生错误:', error.message);
  }
}

//微信推送
function pushWechat(title,desp){
    let send_url = 'https://sc.ftqq.com/' + SCKEY + '.send';
    let params = {
            'text': title,
            'desp': desp
            };
    axios(send_url, {
        method: 'POST',
        data: params,
        headers: { 'Content-Type': 'application/json' }
    })
}