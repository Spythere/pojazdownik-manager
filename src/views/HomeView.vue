<template>
  <div>
    <div class="stock-info" v-if="stockInfo">
      <div>
        <h3>Vehicles Data</h3>

        <ul class="stock-types">
          <li v-for="(stockData, stockType) in stockInfo.info" :key="stockType">
            <h2 class="type-header">
              {{ getStockTypeName(stockType) }}
            </h2>

            <ul class="stock-type-vehicles">
              <li v-for="(data, index) in stockData" :key="index">
                <img
                  :src="`https://raw.githubusercontent.com/Spythere/api/main/td2/images/${data[0]}--300px.jpg`"
                  alt=""
                />
                <div>
                  <span>{{ data[0] }}</span>
                </div>
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
          <li v-for="(item, index) in stockInfo.props" :key="index">
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
import type { IStockInfoResponse, Info } from '../typings/stockInfoTypes'
import axios from 'axios'

const STOCK_TYPES: Record<keyof Info, string> = {
  'loco-e': 'LOK. ELEKTRYCZNE',
  'loco-s': 'LOK. SPALINOWE',
  'loco-ezt': 'EZT',
  'loco-szt': 'SZT',
  'car-cargo': 'WAGONY TOWAROWE',
  'car-passenger': 'WAGONY PASAŻERSKIE'
}

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
    },

    getStockTypeName(type: keyof Info) {
      return STOCK_TYPES[type]
    }
  }
})
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  list-style: none;
  padding: 0;
  margin: 0;
}

.stock-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  align-items: center;

  & > div {
    & > ul {
      max-height: calc(100vh - 5em);
      overflow: auto;
    }
  }
}
.stock-type-vehicles img {
  max-width: 7em;
  vertical-align: middle;
}

ul.stock-type-vehicles > li {
  display: flex;
  gap: 0.5em;

  position: relative;

  background-color: #222;
}

.type-header {
  position: sticky;
  top: 0;
  z-index: 100;
  margin: 0;
  padding: 0.25em;

  background-color: #1b1b1b;
}
</style>
