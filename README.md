#  Commits on Apr 21, 2020
6주차 서비스 작성하고 사용하기

- REST 기반

#  Commits on May 3, 2020
7주차 프론트엔드를 추가한 웹 서비스 작성하기



--------------

## ⭐️모듈 세팅⭐️
##### - npm init

##### - npm i express

##### - npm i pug

##### - npm i method-override

------



## ☀️CONTENT☀️

##### 

| 기능             | URL       | METHOD |
| ---------------- | --------- | ------ |
| 과제 리스트 보기 | /tasks    | get    |
| 과제 상세 보기   | /tasks/id | get    |
| 과제 추가        | /tasks    | post   |
| 과제 수정        | /tasks/id | put    |
| 과제 삭제        | /tasks/id | delete |

##### **포트 : 3006**

------



## ▶️  과제 리스트 보기



#### 요청

| URL         | /tasks |
| ----------- | ------ |
| 요청 메소드 | GET    |

#### 응답

| 컨텐트 타입 | JSON                                                         |
| ----------- | ------------------------------------------------------------ |
| 메세지 구조 | - id : 과제 ID<br />- title : 과제명 <br />- subject : 과목명 <br />- deadline : 마감일 <br />- done : 수행여부 |
| 메세지 예   | <pre><br />{<br />    "data": [<br />    {<br />        "id": 0,<br />        "task": "서비스 작성하고 사용하기",<br />        "subject": "IT기술실무",<br />        "deadline": "2020.04.27",<br />        "done": "NO"<br />    },<br />    {<br />        "id": 1,<br />        "task": "FrontController 패턴"<br />        "subject": "컴퓨터신기술특강",<br />        "deadline": "2020.04.22",<br />     "done": "NO"<br />    }<br />    ],<br />    "count": 2<br />}</pre> |







## ▶️  과제 상세 보기

#### 요청

| URL         | /tasks/id |
| ----------- | --------- |
| 요청 메소드 | GET       |

#### 응답

| 컨텐트 타입 | JSON                                                         |
| ----------- | ------------------------------------------------------------ |
| 메세지 구조 | - id : 과제 ID<br />- title : 과제명 <br />- subject : 과목명 <br />- deadline : 마감일 <br />- done : 수행여부 |
| 메세지 예   | <pre><br />{<br />    "data": [<br />    {<br />        "id": 0,<br />        "task": "서비스 작성하고 사용하기",<br />        "subject": "IT기술실무",<br />        "deadline": "2020.04.27",<br />        "done": "NO"<br />    },<br />    {<br />        "id": 1,<br />        "task": "FrontController 패턴"<br />        "subject": "컴퓨터신기술특강",<br />        "deadline": "2020.04.22",<br />     "done": "NO"<br />    }<br />    ],<br />    "count": 2<br />}</pre> |




