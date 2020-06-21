202012707 김다영
===
DAY14. AWS 사용하기
===

##### - Express에서 파일 업로드

##### - S3로 이미지 업로드

##### - S3 경로를 데이터베이스에 저장하는 프로젝트 작성

--------------
### ✨다운로드 목록✨
##### - npm init

##### - npm i express

##### - npm i pug

##### - npm i aws-sdk

##### - npm i mysql2

##### - npm i sequelize

##### - npm i multer

##### - npm i multer-s3

### 🎈CONTENT🎈

##### - [메인화면](#메인-화면)

##### - [업로드 확인](#업로드-확인-화면)

##### - [데이터베이스 저장된 모습](#DATABASE)

| 업무 구분 |       항목        |    URL     | METHOD |
| :-------: | :---------------: | :--------: | :----: |
|   메인    |     업로드 폼     |  /upload   |  GET   |
|   결과    |    업로드 확인    |  /upload   |  POST  |

--------------

### 📃메인 화면

#### 요청

|    업무     | 메인 업로드 폼 |
| :---------: | ------------------ |
|     URL     | /upload           |
| 요청 메소드 | GET                |

#### 응답

![메인](https://github.com/IDU-SW/202012707KDY/blob/aws_s3/Day14/images/%EB%A9%94%EC%9D%B8%ED%99%94%EB%A9%B4.png?raw=true)

--------------

### 📖업로드 확인 화면

#### 요청

|    업무     | 업로드 확인 화면 |
| :---------: | ---------------- |
|     URL     | /upload          |
| 요청 메소드 | POST             |

#### 응답

![결과](https://github.com/IDU-SW/202012707KDY/blob/aws_s3/Day14/images/%EC%97%85%EB%A1%9C%EB%93%9C%EC%99%84%EB%A3%8C.png?raw=true)

--------------

### 📋DATABASE

#### 저장된 모습

![DATABASE](https://github.com/IDU-SW/202012707KDY/blob/aws_s3/Day14/images/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4.png?raw=true)
