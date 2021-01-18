// 개발시 DB init을 하기 위해 사용

const db = require('./models');
function sync() {
  db.sequelize
    .sync()
    .then(() => {
      console.log(' DB 연결 성공');
    })
    .catch((err) => {
      console.log('연결 실패');
      console.log(err);
    });
}
sync();
