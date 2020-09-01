import { DbAddAccount } from './db-add-acount'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct values', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encryperStub = new EncrypterStub()
    const sut = new DbAddAccount(encryperStub)
    const encryptSpy = jest.spyOn(encryperStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
