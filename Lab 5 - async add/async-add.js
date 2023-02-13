run()

function generateArray(len, maxValue) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * maxValue))
}

async function run() {
  let data = generateArray(100, 100)
  await measurePerformance('for', () => addData1(data))
  await measurePerformance('parallel', () => addData2(data))
}

// for z await
async function addData1(data) {
  let sum = 0
  for (let item of data) {
    sum = await asyncAdd(sum, item)
  }
  return sum
}


// równoległe operacje
async function addData2(values) {
  let data = [...values]
  while (data.length > 1) {
    let asyncTempSums = []
    while (data.length > 0) {
      if (data.length === 1) {
        asyncTempSums.push(Promise.resolve(data.pop()))
      } else {
        const a = data.pop()
        const b = data.pop()
        asyncTempSums.push(asyncAdd(a, b))
      }
    }
    data = await Promise.all(asyncTempSums)
  }
  return data.pop()
}


async function measurePerformance(name, cb) {
  console.log(`Start: ${name}`);
  performance.mark('start')
  const result = await cb()
  performance.mark('end')
  const runTime = performance.measure('Czas wykonania kodu', 'start', 'end')
  console.log(`Wynik z ${name}: ${result}`)
  console.log(`Czas wykonywania: ${runTime.duration.toFixed(2)}ms`)
}
async function asyncAdd(a, b) {
  console.count('[async add operation]')
  if (typeof a !== 'number' || typeof b !== 'number') {
    console.log('err', { a, b })
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 10)
  })
}
