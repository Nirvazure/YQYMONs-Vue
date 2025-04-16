<template>
  <div class="wraper">
    <div ref="chartDom" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from "vue";
import * as echarts from "echarts";
const { metrics } = defineProps(["metrics"]);

const initOptions = {
  radar: {
    indicator: [
      { name: "输出", max: 100 },
      { name: "坦度", max: 100 },
      { name: "推线", max: 100 },
      { name: "团战", max: 100 },
      { name: "支援", max: 100 },
      { name: "控制", max: 100 },
    ],
  },
  series: [
    {
      type: "radar",
      symbolSize: 20,
      data: [
        {
          value: [],
        },
      ],
    },
  ],
};

const chartDom = ref(null);
let chartInstance = null;

onMounted(() => {
  chartInstance = echarts.init(chartDom.value);
  const option = initOptions;
  chartInstance.setOption(option);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});

onUpdated(() => {
  console.log("update", metrics);
  const option = initOptions;
  option.series[0].data[0].value = metrics.map((v) => v.value);
  chartInstance.setOption(option);
});
</script>

<style lang="css" scoped>
.wraper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
