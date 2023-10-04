async function execute() {
    try {
        const knex = require('knex')({
            client: 'oracledb',
            connection: {
                user: 'C##test_user',
                password: 'test_password',
                connectString: 'localhost:1521/FREE'
            }
        });
        
        await knex.schema.createTable('test_table', (table) => {
             table.increments('id');
             table.string('name', 50);
             table.string('email', 50);
             table.integer('age');
        });

        console.log('Table created');
        
        const users = [
            { name: 'John', email: 'john@example.com', age: 30 },
            { name: 'Jane', email: 'jane@example.com', age: 25 },
            { name: 'Bob', email: 'bob@example.com', age: 40 }
        ];
        
        await knex('test_table').insert(users);
        console.log('Users inserted.');

        await knex.destroy();
    } 
    catch (error) {
        console.log(error);
    }   
}

execute();
