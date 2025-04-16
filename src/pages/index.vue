<template>
  <v-container class="container">
    <v-row justify="center" no-gutters>
      <v-col v-for="(v, i) in teamStore.team" :key="i" xl="2">
        <v-img class="img" :src="v.player.img" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTeamStore } from "@/store/app";
// import { onMounted } from "vue";
// import { gatewayAPI } from "@/api";
// import { ref } from "vue";

const teamStore = useTeamStore();
// const memberList = ref([]);

// onMounted(() => {
// getMemberList();
// });

// const getMemberList = () => {
//   gatewayAPI("member.list", { level: 0 }).then((res) => {
//     memberList.value = res.data.result.data;
//   });
// };
</script>

<style>
.container {
  opacity: 0.75;
}
.container:hover .img:not(:hover) {
  filter: blur(5px) grayscale(1);
  transition: 1.2s ease-out;
  transform: scale(0.9);
}
</style>
