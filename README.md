# 202012711_박유진

제목 : 과제 리스트

요청 목록 : 
    전체 리스트 보기    /tasks/ --> get
    검색 리스트 보기    /tasks/id --> get
    리스트 추가        /task/ --> post
    리스트 변경        /task/ --> put   (수행완료시 YES로 바꾸기 위함)
    리스트 삭제        /task/id --> delete

리스트 추가:
    메세지 구조
        task        - 과제 이름
        subject     - 교수명
        deadline    - 마감일
        done        - 수행여부
    
    메세시 예시
        {
            "task": "서비스 작성하고 사용하기",
            "subject": "IT기술실무",
            "deadline": "2020.04.27",
            "done": "NO"
        }

리스트 변경:
    메세지 구조
        id      - 과제 id
        done    - 수행여부
    메세시 예시
        {
            "id": 1,
            "done": "NO"
        }

모든 응답은 JSON으로