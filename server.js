const express = require('express')
const app = express()
const fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors');


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/abc', function (req, res) {
    const jsonData = fs.readFileSync('./test.json')
    //fs는 비동기처리를 필요로 하지않는다 알아서 로딩이 전부되야지만 실행시키기 때문
    res.send(JSON.parse(jsonData))
    //대문자 주의 > 문서가아니라 내용으로보기위해 한번 변경한것
})


//여러개를 만들수 있음
app.get('/abc/:id', function (req, res) {
    const jsonData = fs.readFileSync('./test.json')
    const data = JSON.parse(jsonData);

    console.log(req.params)
    const {id} = req.params;
    const aaa = data.filter(n=>n.id == id)
    //fs는 비동기처리를 필요로 하지않는다 알아서 로딩이 전부되야지만 실행시키기 때문
    res.send(aaa)
    //대문자 주의 > 문서가아니라 내용으로보기위해 한번 변경한것
})



app.post('/insert', function (req, res) {
    fs.writeFileSync('./test.json',JSON.stringify(req.body))
                                    //Json 형식으로 만들어줌 > front에서 보내준내용이 req.body로 들어감


    res.send('성공');
    //요청작업시 샌드필수 - 없을시 로딩 길어짐
})



app.listen(3030)
//http://localhost:3030/