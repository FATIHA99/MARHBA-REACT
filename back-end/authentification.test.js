const {sum,signUp}=require('./controllers/AuthController');
describe(
    'test register',()=>{

        test('test ',()=>{
            expect(signUp('fullname','fatihhaa27@gmail.com','1234')).toBe('email already exist')
        })
    }
)




describe(

    'test sum',()=>{

        test('test sum ',()=>{
            expect(sum(3,7)).toBe(10)
        })
    }
)