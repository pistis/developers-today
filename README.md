# Developer's Today

## 개발시
yarn, sequelize-cli, typescript 전역 설치
```
$ npm i -g sequelize-cli typescript
```

개발 모드 시작
```
$ npm run electron:dev
```


### Database
> sqlite3

#### sqlite3
backup
```
$ sqlite3 dev.sqlite .dump > backup.sql
```

restore
```
$ sqlite3 dev.sqlite < backup.sql
```

##### dev.sqlite db 초기화 (backup sql restore시)
```
$ sqlite3 dev.sqlite .dump > backup.sql
$ rm dev.sqlite
$ sqlite3 dev.sqlite
$ sqlite3 dev.sqlite < backup.sql
```

#### sequelize (tools)
> using ORM https://github.com/sequelize/cli
##### dev.sqlite db 초기화 (scheme 변경시)
```
$ rm dev.sqlite
$ sequelize db:migrate
$ node electron/sqlite/init.js
$ sequelize db:seed:all
```

##### 모델 코드/마이그레이션 코드 변경 후 수행
sequelize db:migrate
##### seed 적용/롤백
sequelize db:seed:all
sequelize db:seed:undo:all
