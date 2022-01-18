import {
  validateEmptyAndEmail,
  validateEmptyAndLength3
} from './validators'

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength3())
      .toBe('*Este campo é obrigatório')
  })

  it('should give an error with less then 3 character payload', () => {
    expect(validateEmptyAndLength3('12'))
      .toBe('*Este campo precisa de no mínimo 3 caracteres')
  })

  it('should returns true when input pass a correct value', () => {
    expect(validateEmptyAndLength3('1234'))
      .toBe(true)
  })

  it('should give an error when e-mail is null', () => {
    expect(validateEmptyAndEmail())
      .toBe('*Este campo é obrigatório')
  })

  it('should give an error whit a invalid param', () => {
    expect(validateEmptyAndEmail('myemail'))
      .toBe('*Este campo precisa ser um e-mail')
  })

  it('should returns true when email is valid', () => {
    expect(validateEmptyAndEmail('myemail@mail.com'))
      .toBe(true)
  })
})
