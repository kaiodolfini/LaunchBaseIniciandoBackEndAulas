const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/55322321?s=460&u=33a029e8ed4965b0ebfc4b1325f8bbfeb31a92ca&v=4",
        name: "Kaio Dolfini",
        title: "Analista de Testes - Pamcary",
        description: 'Analista de testes buscando conhecimento em desenvolvimento para mudar de área, fazendo o curso Launch Base da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/kaiodolfini/" },
            { name:"LinkedIn", url:"https://www.linkedin.com/in/kaiodesouza/" },
            { name: "Facebook", url: "https://www.facebook.com/kaio.dolfini" }
        ]
    }

    return res.render("sobre", { about })
})

server.get("/classes", function (req, res) {
    return res.render("classes", { items: videos })
})

server.get("/video", function (req, res){
    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id 
          
    })
    if (!video){
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })

})

server.listen(5000, function () {
    console.log("Server is Running")
})