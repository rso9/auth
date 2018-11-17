import authService from "../../../api/services/auth";

test('generates a JWT token', () => {
  const payload = { 'text': 'i am a dummy payload' }

  // uses a hardcoded secret 'secret' and an issuedAt time of 1 to yield the same token every time
  expect(authService.getToken(payload, true))
    .toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXh0IjoiaSBhbSBhIGR1bW15IHBheWxvYWQiLCJpYXQiOjF9.iuIdeSKaZh0QcytX39DGlK4RyYES-VfHgTIpsatShqY');
})

test('decodes a valid JWT token', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXh0IjoiaSBhbSBhIGR1bW15IHBheWxvYWQiLCJpYXQiOjF9.iuIdeSKaZh0QcytX39DGlK4RyYES-VfHgTIpsatShqY'

  expect(authService.verifyToken(token, null, true))
    .toEqual({
      iat: 1,
      text: 'i am a dummy payload'
    })
})

test('fails at decoding an invalid JWT token', () => {
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXh0IjoiaSBhbSBhIGR1bW15IHBheWxvYWQiLCJpYXQiOjF9.iuIdeSKaZh0QcytX39DGlK4RyYES-VfHgTIpsatShqY'
  token += '1337H4X0R---'

  expect(() => authService.verifyToken(token, null, true)).toThrow()
})