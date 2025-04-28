'use server'

/** Utility: artificial delay */
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export async function A() {
  await delay(500) // 500 ms
  return 'A done'
}
export async function B() {
  await delay(450) // 450 ms
  return 'B done'
}
export async function C() {
  await delay(400) // 400 ms
  return 'C done'
}
export async function D() {
  await delay(350) // 350 ms
  return 'D done'
}
export async function E() {
  await delay(300) // 300 ms
  return 'E done'
}
export async function F() {
  await delay(250) // 250 ms
  return 'F done'
}
export async function G() {
  await delay(200) // 200 ms
  return 'G done'
}

export async function callEfficient() {
  await Promise.all([A(), B(), C(), D(), E(), F(), G()])
}
