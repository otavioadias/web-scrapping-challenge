import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index.js';
import { laptops, thinkpad } from './mock/laptopsLenovo.js'

chai.use(chaiHttp);

describe('Teste da rota /laptops', function () {
    this.timeout(11000);
    describe('Teste se é listado todos os notebooks Lenovo em ordem crescente', () => {
        it('Deve retornar um status 200 com array de objetos com informações do notebook', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/laptops')

            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.be.deep.equal(laptops);
        });
    });

    describe('Teste se procurar por ThinkPad retorna somente os notebooks Lenovo que são desse modelo', () => {
        it('Deve retornar um status 200 com array de objetos com informações do notebook', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/laptops/search?q=ThinkPad')

            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.be.deep.equal(thinkpad);
        });
    });

    describe('Teste se procurar por Mackbook e retorna um erro', () => {
        it('Deve retornar um erro informando que não foi encontrado nenhum notebook com essas características', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/laptops/search?q=Mackbook')

            expect(httpResponse.status).to.equal(500);
            expect(httpResponse.body).to.be.deep.equal({
                "error": "No notebook found with these characteristics"
              });
        });
    });
});