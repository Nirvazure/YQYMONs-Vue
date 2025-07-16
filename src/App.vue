<template>
  <v-app>
    <div class="text-center mt-3">
      <!-- <h1
        @click="$router.push(`/`)"
        class="text-h1 font-weight-bold animate__animated animate__zoomIn forte mb-2 mt-10 d-xs-none"
      >
        <span class="teal forte">YQY</span><span class="forte">MONs</span>
      </h1>
      <p class="gradiantText">KPL Legend Team</p> -->

      <v-item-group v-model="model" class="my-6">
        <v-item v-for="(v, i) in btns" :key="i">
          <template v-slot:default="{ toggle }">
            <v-btn
              class="mx-3"
              :active="model == i"
              color="#46b685"
              :class="{ 'teal-bg': model == i }"
              variant="text"
              @click="btnChange(v.text, toggle)"
              >{{ v.text }}</v-btn
            >
            <span v-if="i < btns.length - 1"> |</span>
          </template>
        </v-item>
      </v-item-group>
    </div>
    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const btns = [
  { text: "squad" },
  { text: "show" },
  { text: "shop" },
  { text: "decoration" },
];
const model = null;

const router = useRouter();

const btnChange = (url: string, toggle: any) => {
  router.push(url);
  toggle();
};
</script>

<style lang="css" scoped>
.teal {
  background: linear-gradient(to right, #9affd3, #3b6854);
  background-clip: text;
  color: transparent;
}
.forte {
  font-family: "Forte", sans-serif;
}
.teal-bg {
  background-color: #46b685;
}
.gradiantText {
  font-weight: 700;
  font-size: 26px;
  background: linear-gradient(to right, #fff71d, rgb(20, 32, 255));
  background-clip: text;
  color: transparent;
}
</style>
