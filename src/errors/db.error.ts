export class UniqueValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UniqueValueError"
  }
}

export class NotFoundError extends Error {
  query: any

  constructor(message: string, query: any) {
    super(message)
    this.query = query
    this.name = "NotFoundError"
  }
}
