# marathon-frontend

## 專案文件
請用 draw.io 打開 ```document/MarathonDashboard.xml```

## 環境安裝
下載安裝 <a href="nodejs.org/en/ ">node.js</a>

node安裝完後，接著使用npm安裝vue cli

```
npm install -g @vue/cli
```

### 使用前安裝必要資源 (需進入專案資料夾)
```
npm install
```

### 啟動專案  (需進入專案資料夾)
```
npm run serve
```

### 功能分頁
```
ip + /#/  為折馬拉松模式
ip + /#/BackNForth  為折返跑模式
ip + /#/Controller  為控制器

```
### 修改WebSocket後端的IP連線地址
在 ```src/App.vue``` 中找到 ```connect_ip```

```js
private connect_ip: String = "IP位置";
```