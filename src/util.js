import snakecase from "snakecase";

export function keysToSnakeCase(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .map((kv) => [snakecase(kv[0]), kv[1]]),
  );
}

export function download(url, name) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name; //File name Here
  a.click(); //Downloaded file
}
