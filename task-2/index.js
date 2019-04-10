/**
 * Стараемся постоянно использовать обе сковороды.
 * 1. Жарим А и Б блина с одной стороны
 * 2. Жарим блин А с другой стороны и блин С
 * 3. Жарим блин Б с другой стороны и блин С с другой стороны
 * Берем в работу блины с наименьшей готовностью
 */

const cakeG = () => ({ progress: -1 })
const cakeIsReady = cake => cake.progress === 1
const cakesIsReady = cakes => cakes.every(cakeIsReady)
const sortCakes = cakes => [...cakes].sort((a, b) => a.progress - b.progress)
const doCake = cake => ({ progress: cake.progress + 1 })
const panG = capacity => ({ capacity })
const panFry = cake => doCake(cake)
const panFryPack = cakes => cakes.map(panFry)
const getPanCapacity = pan => pan.capacity
const getPanCapacityPack = pans => pans.reduce((acc, cur) => acc + getPanCapacity(cur), 0)
const getPortion = (cakes, capacity) => {
  const sortedCakes = sortCakes(cakes)
  const readyCakes = sortedCakes.filter(cakeIsReady)
  const toFryCakes = sortedCakes.filter(c => !cakeIsReady(c))
  return [
    toFryCakes.slice(0, capacity), 
    [...toFryCakes.slice(capacity, toFryCakes.length ), ...readyCakes]
  ]
}
const factory = (entity, count, arg = []) => [...Array(count)].map(() => entity(...arg))

const cooker = (cakes, pans) => {
  const isReady = cakesIsReady(cakes)
  if (isReady) {
    return [ true, cakes ]
  }
  const [toFry, wait] = getPortion(cakes, getPanCapacityPack(pans))
  return [ false, [...panFryPack(toFry), ...wait] ]
}

const cook = (cooker, cakes, pans, iter = 0) => {
  const [isDone, newCakes] = cooker(cakes, pans)
  if (isDone) {
    return [ iter, newCakes]
  }
  return cook(cooker, newCakes, pans, iter += 1)
}

const [ iterations, readyCakes ] = cook(cooker, factory(cakeG, 3), factory(panG, 2, [1]))
console.log("Iterations:", iterations)
