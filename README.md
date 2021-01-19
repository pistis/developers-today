# Developer's Today

개발자의 하루의 일과 관리 데스크탑 프로그램. ([Electron app](http://electron.atom.io/))

## 스크린샷
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

**[v0.0.4 not yet ready](https://github.com/pistis/developers-today)**

## 버그 제보 또는 기능 개선 요청
버그가 있다면 자유롭게 이슈에 등록해주세요.
있었으면 하는 기능이 있다면 자유롭게 이슈에 등록해주세요.

## Contributing
아직 v1.0을 만들기 위한 초기 단계라 코드보다는 아이디어적인 contribution이 절실합니다.  
현재 버전으로도 사용하는데에는 필수 기능을 제공합니다. 

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
sequelize db:migrate

**seed 적용/롤백**
sequelize db:seed:all
sequelize db:seed:undo:all

</details>

## License

[MIT](LICENSE) &copy; [pistis](https://github.com/pistis)