# Developer's Today

개발자의 하루의 일과 관리 데스크탑 프로그램. ([Electron app](http://electron.atom.io/))

## 개요 (주절 주절)
**제품 특징**
1. 로컬에 sqlite database에 모든 내역 저장
    - 장점 : 온라인에 그 어떤 정보도 저장하지 않음 (완벽한 오프라인 프로그램)
    - 단점 : 여러 기기 싱크 불가 :)
2. 현재 손쉬운 db 백업/복원 기능이 없음(수동으로 prod.sqlite sqlite db를 복사하여 백업하고 새로운 버전을 설치해야함 :)
3. 다운로드 링크 미제공(개발자에게 다이렉트로 받아야함 :))

**개발 동기 부여**
- 필자는 2009년부터 2015년까지 : Google Docs등을 활용하여 개발 업무에 대한 정리를 해왔음
- 필자는 2016년부터 현재까지(2021년) : Evernote등을 활용하여 매일매일 진행한 업무 정리를 해왔음(모든 히스토리는 다있다!!?)

**만든 이유 (찐)**
- 에버노트가 언제 사라질지 모르겠다.
    - 고로 내가 온전히 제어할 수 있는 나의 업무 히스토리 데이터베이스를 내가 가지고 싶다.
- 에버노트에 정리하는 걸 나중에 보고 싶을때 일일이 노트를 들어가서 봐야한다.
    - 매우 불편하며 나의 작업 내역을 손쉽고 보기 쉽게 요약 정리할 수 없다.


**만든 이유 (있어보이는)**
- 내가 얼마나 시간을 효율적으로 사용하면서 일을 할까?
- 업무 추정시간과 실제 소요시간의 차이가 얼마나 날까? (나는 얼마나 일정 추정을 잘하나?)
- 내가 한 일 들이 일목 요연하게 정리되고 분기/반기/년도별로 내가 한 업무를 한번에 보고 싶은데?
    - 어떤 프로젝트에 어떤 성격(카테고리)의 일들에 얼마만큼의 시간을 쏟아부었나!?
    - 나는 코드를 많이 생산하는가?
    - 나는 코드 리뷰를 많이 하는가?
    - 나는 미팅을 많이 하는가?
    - 나는 쳐 노는가?(커피커피커피?)
    - 나는 점심시간을 남들보다 많이 사용하는가? :)
    - 나는.... 그만하자.
- 나는 과연 어떤 일들을 얼마 만큼 하고 있는가?




## 스크린샷 (v0.0.4)
### 기본
|      프로젝트 관리         |  카테고리 관리 | 업무 관리 |
| :-------------:| :-----:| :-----: |
| ![Screenshot](./docs/v1.0.0/img/project%20management%20(CRUD).png) | ![Screenshot](./docs/v1.0.0/img/category%20management%20(CRUD).png) | ![Screenshot](./docs/v1.0.0/img/task%20management%20(CRUD).png)

### 업무 관리
|      업무 등록 폼         |    그날의 업무 소요시간 통계 차트   | 그날의 진행 업무 요약 보고서 |
| :-------------:| :-----:| :-----: |
| ![Screenshot](./docs/v1.0.0/img/task%20management%20(Form).png) | ![Screenshot](./docs/v1.0.0/img/task%20management%20(statistics).png) | ![Screenshot](./docs/v1.0.0/img/task%20management%20(summary).png)

### 통계
|      기간 선택         |    기간내 소요시간 통계 차트   | 기간내 진행 업무 요약 보고서 |
| :-------------:| :-----:| :-----: |
| ![Screenshot](./docs/v1.0.0/img/statistics%20(date%20range%20picker).png) | ![Screenshot](./docs/v1.0.0/img/statistics%20(spent%20time%20chart).png) | ![Screenshot](./docs/v1.0.0/img/statistics%20(summary).png)


## Download

현재 Mac OS만 지원합니다.

**[v0.0.4 download](https://www.dropbox.com/s/sdwb97kuyypaeq2/Developers%20Today-0.0.4.dmg?dl=0)**

## 버그 제보 또는 기능 개선 요청
- 버그가 있다면 자유롭게 이슈에 등록해주세요.
- 있었으면 하는 기능이 있다면 자유롭게 이슈에 등록해주세요.

## Contributing
- 아직 v1.0을 만들기 위한 초기 단계라 코드보다는 아이디어적인 contribution이 절실합니다.  
- 현재 버전으로도 사용하는데에는 필수 기능을 제공합니다. 

## Developing

<details>
<summary>Setup</summary>

```bash
# nvm use
$ nvm use

# yarn, sequelize-cli, typescript 전역 설치
$ npm i -g yarn sequelize-cli typescript

# start dev mode
$ npm run electron:dev
```

**Database**
> sqlite3

**sqlite3**
backup
```
$ sqlite3 dev.sqlite .dump > backup.sql
```

restore
```
$ sqlite3 dev.sqlite < backup.sql
```

**dev.sqlite db 초기화 (backup sql restore시)**
```
$ sqlite3 dev.sqlite .dump > backup.sql
$ rm dev.sqlite
$ sqlite3 dev.sqlite
$ sqlite3 dev.sqlite < backup.sql
```

**sequelize (tools)**
> using ORM https://github.com/sequelize/cli
**dev.sqlite db 초기화 (scheme 변경시)**
```
$ rm dev.sqlite
$ sequelize db:migrate
$ node electron/sqlite/init.js
$ sequelize db:seed:all
```

**모델 코드/마이그레이션 코드 변경 후 수행**
```
sequelize db:migrate
```

**seed 적용/롤백**
```
sequelize db:seed:all
sequelize db:seed:undo:all
```

</details>

## License

[MIT](LICENSE) &copy; [pistis](https://github.com/pistis)