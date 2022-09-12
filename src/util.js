import snakecase from "snakecase";
 
export function keysToSnakeCase(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .map(kv => [snakecase(kv[0]), kv[1]]
      )
  )
}