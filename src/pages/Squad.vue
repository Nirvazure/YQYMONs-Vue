<template>
  <div>
    <TeamPreview :team="teamStore.team" class="my-5" />
    <div class="text-center">
      <v-btn
        class="text-white gradiantBtn rounded-xl"
        color="#46b685"
        @click="teamStore.shuffler"
        width="400"
        size="large"
      >
        <span class="font-weight-black">更换阵容</span>
      </v-btn>
    </div>

    <RaddarChart :metrics="teamStore.metrics" />

    <v-row justify="center">
      <div v-for="(v, i) in metrics" :key="i" class="text-center ma-4">
        <v-progress-circular
          class="text-center title"
          rotate="360"
          size="100"
          width="10"
          :model-value="v.value"
          :color="v.color"
          >{{ v.value }}</v-progress-circular
        >
        <h4 class="title font-weight-thin">{{ v.name }}</h4>
      </div>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from "@/store/app.ts";

const teamStore = useTeamStore();
</script>

<style lang="css" scoped>
.gradiantBtn {
  background-image: linear-gradient(45deg, #74b58e, #8cdbac);
}
</style>
