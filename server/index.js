const express = require('express')
const app = express()
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost:27017/element-admin', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true
})
app.use(require('cors')())
app.use(express.json())
//创建模型
const Article = mongoose.model(
  'Article',
  new mongoose.Schema({
    title: { type: String },
    body: { type: String }
  })
)

//新增文章
app.post('/api/articles', async (req, res) => {
  const article = await Article.create(req.body)
  res.send(article)
})
// 文章列表
app.get('/api/articles', async (req, res) => {
  const article = await Article.find()
  res.send(article)
})
//删除文章
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})
//文章详情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article)
})

//修改文章
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article)
})

app.get('/', async (req, res) => {
  res.send()
})
app.listen(3001, () => {
  console.log('http://localhost:3001/')
})
