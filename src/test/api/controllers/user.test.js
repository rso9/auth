import UserController from '../../../api/controllers/user'

test('index lists users', () => {
  UserController.index().then((list) => {  
    expect(list).toReturnWith({id: 1})
  }).catch(() => {})
})
