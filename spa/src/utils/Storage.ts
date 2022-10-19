export function loadStorage() {
  return JSON.parse(localStorage.getItem("config") || "{}")
}

export function saveStorage(config: any) {
  localStorage.setItem("config", JSON.stringify(config))
}
