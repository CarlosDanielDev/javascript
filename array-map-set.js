import { performance } from 'perf_hooks';

const formatResults = (label, results) => {
  console.log(`Benchmark: ${label}`);
  console.table({
    'Insert Time (ms)': results.insert.toFixed(4),
    'Search Time (ms)': results.search.toFixed(4),
    'Delete Time (ms)': results.delete.toFixed(4)
  });
  console.log('-----------------------');
}

const arrayBenchmark = (size) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(i)
  }

  const startInsert = performance.now();
  arr.push(size);
  const endInsert = performance.now();

  const startSearch = performance.now();
  arr.includes(size / 2);
  const endSearch = performance.now();

  const startDelete = performance.now();
  const index = arr.indexOf(size / 2);
  if (index > -1) {
    arr.splice(index, 1);
  }
  const endDelete = performance.now();

  return {
    insert: endInsert - startInsert,
    search: endSearch - startSearch,
    delete: endDelete - startDelete,
  }
}

const setBenchmark = (size) => {
  const set = new Set();
  for (let i = 0; i < size; i++) {
    set.add(i)
  }

  const startInsert = performance.now();
  set.add(size)
  const endInsert = performance.now()

  const startSearch = performance.now()
  set.has(size / 2);
  const endSearch = performance.now();

  const startDelete = performance.now();
  set.delete(size / 2);
  const endDelete = performance.now();

  return {
    insert: endInsert - startInsert,
    search: endSearch - startSearch,
    delete: endDelete - startDelete,
  };
};

const mapBenchmark = (size) => {
  const map = new Map();
  for (let i = 0; i < size; i++) {
    map.set(i, i);
  }

  const startInsert = performance.now();
  map.set(size, size);
  const endInsert = performance.now();

  const startSearch = performance.now();
  map.has(size / 2);
  const endSearch = performance.now();

  const startDelete = performance.now();
  map.delete(size / 2);
  const endDelete = performance.now();

  return {
    insert: endInsert - startInsert,
    search: endSearch - startSearch,
    delete: endDelete - startDelete,
  };
};

const runBenchmarks = (sizes) => {
  sizes.forEach((size) => {
    console.log(`Benchmarking size: ${size}`);

    const arrayResults = arrayBenchmark(size);
    formatResults('Array', arrayResults);

    const setResults = setBenchmark(size);
    formatResults('Set', setResults);

    const mapResults = mapBenchmark(size);
    formatResults('Map', mapResults);
  });
};

runBenchmarks([1000000]);

