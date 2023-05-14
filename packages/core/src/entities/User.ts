export class User {
  public readonly id: number;
  public readonly email: string;
  public readonly name?: string;

  constructor(id: number, email: string, name?: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

export class UserBuilder {
  private id?: number;
  private email?: string;
  private name?: string;

  constructor() {
    this.id = undefined;
    this.email = undefined;
    this.name = undefined;
  }

  build(): User | undefined {
    if (this.id === undefined) return undefined;
    if (this.email === undefined) return undefined;

    return new User(this.id, this.email, this.name);
  }

  setId(id: number) { this.id = id; }
  setEmail(email: string) { this.email = email; }
  setName(name?: string) { this.name = name; }
}

export default User;
