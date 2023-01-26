export class LocalStorage {
  constructor(private readonly localStorage: any) {}

  exists(key: string) {
    return !!localStorage.getItem(key);
  }

  get(key: string) {
    return this.decodeJson(localStorage.getItem(key));
  }

  put(key: string, data: any) {
    localStorage.setItem(key, this.encodeJson(data));

    return data;
  }

  encodeJson(data: any) {
    return JSON.stringify(data);
  }

  decodeJson(data: any) {
    return JSON.parse(data);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
