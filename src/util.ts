
export function matchNonIndexJsTs(file: string) {
  return !file.match(/^index\.[jt]s$/) && file.match(/\.[jt]s$/);
}
