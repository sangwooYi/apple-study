// 서버 구축하는 기본 문법 express 라이브러리 이용
const express = require('express');
const app = express();
app.use(express.json())
const port = 8080;
// 해당 port에 서버가 열리면 뒤의 callback 함수를 실행해주는 역할
app.listen(port, () => {
  console.log(`hello~ this port open port: ${port}!`)
});

// get 요청에 대한 응답
app.get('/pet', (req, res) => {
  res.send(`${req.body} 안녕!`);
})

app.get('/beauty', (req, res) => {
  res.send("뷰티 페이지" + req);
})

app.get('/', (req, res) => {
  // 해당 경로의 파일을 보내준다.
  console.log(__dirname)  // 이러면 서버의 로그가 남음
  res.sendFile(__dirname + '/index.html');
})