const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () =>{
    beforeEach(async () => {
        //await connection.migrate.rollback();
        await connection.migrate.up(create_ongs);
    });


    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', 'ong_id_valida') - para testar autenticação
            .send({ 
                name: "APAD32",
                email: "contato@test.com",
                whatsapp: "12345678912",
                city: "Rio do Sul",
                uf: "SC"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});