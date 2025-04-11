// 既存の app.use('/api/admin', adminApi); の下に追加
const userApi = require('./api/user');
app.use('/api/user', userApi);
