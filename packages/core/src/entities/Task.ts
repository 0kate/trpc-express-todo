import User from "./User";

export class Task {
  public readonly id: number;
  public readonly title: string;
  public readonly done: boolean;
  public readonly user: User;

  constructor(id: number, title: string, done: boolean, user: User) {
    this.id = id;
    this.title = title;
    this.done = done;
    this.user = user;
  }
}

export class TaskBuilder {
  private id?: number;
  private title?: string;
  private done?: boolean;
  private user?: User;

  constructor() {
    this.id = undefined;
    this.title = undefined;
    this.done = undefined;
    this.user = undefined;
  }

  build(): Task | undefined {
    if (this.id === undefined) return undefined;
    if (this.title === undefined) return undefined;
    if (this.done === undefined) return undefined;
    if (this.user === undefined) return undefined;

    return new Task(
      this.id,
      this.title,
      this.done,
      this.user,
    );
  }

  setId(id: number) { this.id = id; }
  setTitle(title: string) { this.title = title; }
  setDone(done: boolean) { this.done = done; }
  setUser(user: User) { this.user = user; }
}

export default Task;
