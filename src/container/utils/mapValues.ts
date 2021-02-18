export default function mapValues<
  Obj extends object,
  Res extends { [key in keyof Obj]: any }
> (o: Obj, func: (value: Obj[keyof Obj]) => Res[keyof Obj]) {
  const res: Res = {} as any
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      (res as {[key: string]: any})[key] = func(o[key])
    }
  }
  return res
}
