const express = require('express');
const router = express.Router();
const uploads = require('../model/uploadModel');
let AWS = require("aws-sdk")
let multer = require('multer');
let path = require("path");

let s3 = new AWS.S3();
let multerS3 = require("multer-s3");

const now = new Date();
const itemKey = 'upload/' + now.getHours() + now.getMinutes() + now.getSeconds() + Math.floor(Math.random() * 1000);

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "idu-2020-001",
        key: function (req, file, cb) {
            let extension = path.extname(file.originalname) //파일 확장자 추출
            cb(null, itemKey + extension) // 파일 저장 이름
        },
        acl: 'public-read',
        mimetype:'image/jpeg',
        location: "/upload"
    })
})


router.get('/upload', uploadForm); // 메인
router.post('/upload', upload.single('filename'), uploadFile); // 파일 업로드

module.exports = router;

// 전체 목록 보기
async function uploadForm(req, res) {
    res.render('upload', {content:"업로드할 이미지를 선택 후 업로드 버튼을 눌러주세요."});
}

// 추가
async function uploadFile(req, res) {
    const name = req.file.key;
    const url = req.file.location;

    const info = await uploads.uploadFile(name, url);
    res.render('upload_success', {name:info.file_name, url: info.url, content:info.content});
}