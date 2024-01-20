<template>
  <div>
    <div class="stock-info" v-if="stockInfo">
      <div>
        <h3>Vehicles Data</h3>

        <ul class="stock-types">
          <li v-for="(stockData, stockType) in stockInfo.info" :key="stockType">
            {{ stockType }}
            <ul class="stock-type-vehicles">
              <li style="display: flex; gap: 0.5em" v-for="(data, index) in stockData" :key="index">
                <img
                  :src="`https://raw.githubusercontent.com/Spythere/api/main/td2/images/${data[0]}--300px.jpg`"
                  alt=""
                />
                <span>{{ data[0] }}</span>
                <span>{{ data[1] }}</span>
                <span>{{ data[2] }}</span>
                <span>{{ data[3] }}</span>
                <span>{{ data[4] ?? '---' }}</span>
                <span
                  >prop:
                  {{
                    stockInfo.props.find((p) => data[0]?.startsWith(p.type) || p.type == data[1])
                      ?.type
                  }}</span
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h3>Props Data</h3>
        <ul class="stock-props">
          <li
            style="display: flex; gap: 0.5em"
            v-for="(item, index) in stockInfo.props"
            :key="index"
          >
            <span> {{ item.type }}</span>
            <span>{{ item.mass }}</span>
            <span>{{ item.length }}</span>
            <!-- <span>{{ item.cargo }}</span> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      stockInfo: null as IStockInfoResponse | null
    }
  },

  mounted() {
    this.fetchStockInfo()
  },

  methods: {
    async fetchStockInfo() {
      try {
        const response = await axios.get<IStockInfoResponse>(
          'https://raw.githubusercontent.com/Spythere/api/main/td2/data/stockInfo.json'
        )

        this.stockInfo = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.stock-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  align-items: center;

  & > div {
    max-height: 95vh;
    overflow: auto;
  }
}
.stock-type-vehicles img {
  max-width: 7em;
}
</style>
