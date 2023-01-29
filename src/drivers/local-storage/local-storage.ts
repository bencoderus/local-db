export class LocalStorage {
  constructor(private readonly localStorage: any) {}

  public exists(key: string) {
    return !!localStorage.getItem(key);
  }

  public get(key: string) {
    return this.decodeJson(localStorage.getItem(key));
  }

  public put(key: string, data: any) {
    localStorage.setItem(key, this.encodeJson(data));

    return data;
  }

  private encodeJson(data: any) {
    return JSON.stringify(data);
  }

  private decodeJson(data: any) {
    return JSON.parse(data);
  }

  public delete(key: string) {
    localStorage.removeItem(key);
  }
}
