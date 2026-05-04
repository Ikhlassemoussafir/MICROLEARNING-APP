const { Client } = require('pg');
const client = new Client({ user: 'microlearning_user', password: 'microlearning_pass_2026', host: 'localhost', port: 5432, database: 'microlearning_db' });
client.connect();
client.query("INSERT INTO grains (title, difficulty_level, target_vark_style, learning_objective, order_index) VALUES ('Test', 'DEBUTANT', 'VISUEL', 'Test', 1)", (err, res) => {
  console.log(err ? err.stack : 'Success');
  client.end();
});
