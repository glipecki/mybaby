export class ObjectUtil {

  static isEmpty(obj: any): boolean {
    return obj === null || obj === undefined;
  }

  static requireNonEmpty<T>(obj: T, error: string = 'Non-empty object required'): T {
    if (ObjectUtil.isEmpty(obj)) {
      throw new Error(error);
    }
    return obj;
  }

}
