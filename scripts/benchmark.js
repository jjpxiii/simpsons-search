const TIME_BETWEEN_REQUESTS = 500;
const NUMBER_OF_REQUESTS = 10;
const SEARCH_TERM = "homer";

// Depending on the environment, the local server might be on a different port.
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function runBenchmark() {
  console.log(`\n==== SIMPSONS SEARCH API BENCHMARK ====`);
  console.log(`Target: ${BASE_URL}/api/search?q=${SEARCH_TERM}`);
  console.log(`Running ${NUMBER_OF_REQUESTS} requests...`);
  console.log(`======================================\n`);

  let totalTime = 0;
  let maxTime = 0;
  let minTime = Infinity;

  for (let i = 1; i <= NUMBER_OF_REQUESTS; i++) {
    const start = performance.now();
    try {
      const response = await fetch(`${BASE_URL}/api/search?q=${SEARCH_TERM}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Read the body to ensure the request is fully completed
      await response.json();
    } catch (e) {
      console.error(`Request ${i} failed:`, e);
      continue;
    }
    const end = performance.now();
    const duration = end - start;

    totalTime += duration;
    if (duration > maxTime) maxTime = duration;
    if (duration < minTime) minTime = duration;

    console.log(`[Req ${i.toString().padStart(2, "0")}] Time: ${duration.toFixed(2)} ms`);

    // Wait a bit between requests to avoid overwhelming if not needed
    if (i < NUMBER_OF_REQUESTS) {
      await new Promise((resolve) => setTimeout(resolve, TIME_BETWEEN_REQUESTS));
    }
  }

  const averageTime = totalTime / NUMBER_OF_REQUESTS;

  console.log(`\n==== BENCHMARK RESULTS ====`);
  console.log(`Total  requests: ${NUMBER_OF_REQUESTS}`);
  console.log(`Average latency: ${averageTime.toFixed(2)} ms`);
  console.log(`Min latency    : ${minTime.toFixed(2)} ms`);
  console.log(`Max latency    : ${maxTime.toFixed(2)} ms`);
  console.log(`===========================\n`);

  if (averageTime < 200) {
    console.log("✅ PERFECT: Average latency is extremely fast (< 200ms). The cache is working beautifully!");
  } else if (averageTime < 1000) {
    console.log("⚠️ OKAY: Average latency is acceptable (< 1s), but could be improved.");
  } else {
    console.log("❌ SLOW: Average latency is high (> 1s). The cache might not be working or the API logic is heavy.");
  }
}

runBenchmark();
