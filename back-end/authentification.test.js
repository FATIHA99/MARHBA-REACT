const request = require('supertest')
const app = require('./index');


describe('test login', () => {
      let body ={
        email : '',
        password : ''
      }
      
      
      describe('fill field !!', () => {
        test('fill field !!',async()=>{
          const response = await request(app).post('/api/auth/login').send(body);
          expect(response.statusCode).toBe(400);
          
        })
      })

      describe('user not found', () => {
        test('user not found',async()=>{
          const response = await request(app).post('/api/auth/login').send(body);
          expect(response.statusCode).toBe(400);
          
        })
      })


      describe('password wrong', () => {
        test('password wrong',async()=>{
          const response = await request(app).post('/api/auth/login').send(body);
          expect(response.statusCode).toBe(400);
          
        })
      })
})


//  register 


describe('test register', () => {
  let body ={
    fullName : 'sahtfatiha',
    email : 'fatihhaa2@gmail.com',
    password : '12345'
  }
  
  describe('email already exist', () => {
    test('email already exist',async()=>{
      const response = await request(app).post('/api/auth/register').send(body);
      expect(response.statusCode).toBe(400);
    })
  })

  describe('created successfully ! verify your email', () => {
    test('created successfully ! verify your email',async()=>{
      const response = await request(app).post('/api/auth/register').send(body);
      expect(response.statusCode).toBe(400);
    })
  })




})