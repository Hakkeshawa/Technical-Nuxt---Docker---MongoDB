<!-- frontend/pages/index.vue -->
<template>
  <div>
    <h1>Bitcoin Price Tracker</h1>
    <select v-model="selectedPeriod" @change="fetchBitcoinPrices">
      <option value="day">Day</option>
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
      <option value="custom">Custom</option>
    </select>

    <div v-if="selectedPeriod === 'custom'">
      <label for="startDate">Start Date:</label>
      <input type="date" v-model="startDate" id="startDate">

      <label for="endDate">End Date:</label>
      <input type="date" v-model="endDate" id="endDate">
      
      <button @click="fetchBitcoinPrices">Apply</button>
    </div>

    <div>
      <chart :data="chartData"></chart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPeriod: 'day',
      startDate: null,
      endDate: null,
      bitcoinPrices: [],
    };
  },
  computed: {
    chartData() {
      // Format bitcoinPrices data for chart library (adjust as needed)
      return {
        labels: this.bitcoinPrices.map(price => new Date(price.timestamp).toLocaleString()),
        datasets: [
          {
            label: 'Bitcoin Price (USD)',
            data: this.bitcoinPrices.map(price => price.price),
          },
        ],
      };
    },
  },
  methods: {
    async fetchBitcoinPrices() {
      // Implement logic to fetch bitcoin prices based on selectedPeriod, startDate, and endDate
      // Update this.bitcoinPrices with the fetched data
    },
  },
  mounted() {
    this.fetchBitcoinPrices();
  },
};
</script>
