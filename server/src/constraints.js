export const newUserConstraints = {
  username: {
    presence: true,
    type: 'string',
    length: {
      minimum: 6,
      maximum: 128
    }
  },
  email: {
    presence: true,
    format: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  password: {
    presence: true,
    format: {
      pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      message: 'should have at least one letter and one number'
    },
    length: {
      minimum: 8,
      maximum: 128
    }
  }
}


export const userConstraints = {
  email: {
    presence: true,
    type: 'string'
  },
  password: {
    presence: true,
    type: 'string'
  }
}