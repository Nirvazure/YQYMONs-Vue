<template>
  <div>
    <v-parallax class="mb-10" :height="bannerHeight" :src="ppt"></v-parallax>
    <v-row>
      <v-col cols="3">
        <v-list
          nav
          class="rounded-lg mx-10"
          @update:selected="selectItems"
          color="teal"
        >
          <v-list-item
            v-for="(item, i) in shopStore.menuItems"
            :key="i"
            :value="item.name"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <div>
          <v-row justify="center" v-if="selectedItem === 'T-Shirts'">
            <v-col
              md="4"
              sm="12"
              xs="12"
              v-for="(v, i) in shopStore.shirts"
              :key="i"
            >
              <v-hover v-slot:default="{ isHovering, props }">
                <v-card
                  class="card"
                  v-bind="props"
                  :elevation="isHovering ? 12 : 2"
                  :color="isHovering ? v.color : ''"
                >
                  <v-carousel
                    :continuous="false"
                    :show-arrows="false"
                    delimiter-icon="mdi-square"
                    height="300"
                    hide-delimiter-background
                    class="text-black"
                  >
                    <v-carousel-item
                      v-for="(slide, i) in shopStore.shirts"
                      :key="i"
                    >
                      <v-sheet height="100%" tile>
                        <v-img
                          cover
                          :src="slide.img"
                          :aspect-ratio="shirtRatio"
                        ></v-img>
                      </v-sheet>
                    </v-carousel-item>
                  </v-carousel>
                  <v-card-title>YQYMONsT恤</v-card-title>
                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>

                      <div class="grey--text ms-4">4.5 (413)</div>
                    </v-row>
                    <div class="my-4 text-subtitle-1">￥ 100.00</div>
                  </v-card-text>
                  <v-divider
                    class="mx-4 d-none d-lg-flex d-xl-none"
                  ></v-divider>
                  <v-card-text class="d-none d-lg-flex d-xl-none">
                    <v-chip-group
                      active-class="deep-purple accent-4 white--text"
                      column
                    >
                      <v-chip>S</v-chip>
                      <v-chip>M</v-chip>
                      <v-chip>L</v-chip>
                      <v-chip>XL</v-chip>
                    </v-chip-group>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem === 'Signs'">
            <v-col md="6" xs="12" v-for="(v, i) in shopStore.signs" :key="i">
              <v-hover v-slot:default="{ isHovering }">
                <v-card
                  v-if="selectedItem === 'Signs'"
                  class="rounded-xl"
                  :elevation="isHovering ? 12 : 2"
                  :color="isHovering ? v.color : ''"
                >
                  <v-img
                    cover
                    :src="teamCard"
                    :aspect-ratio="shirtRatio"
                  ></v-img>
                  <v-card-title>YQYMONsT恤</v-card-title>
                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>

                      <div class="grey--text ms-4">4.5 (413)</div>
                    </v-row>
                    <div class="my-4 text-subtitle-1">￥ 100.00</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem === 'TeamCard'">
            <v-col
              md="3"
              xs="12"
              v-for="(v, i) in shopStore.teamCards"
              :key="i"
            >
              <v-hover v-slot:default="{ isHovering, props }">
                <v-card
                  class="rounded-xl"
                  v-bind="props"
                  :elevation="isHovering ? 12 : 2"
                  :color="isHovering ? v.color : ''"
                  :class="{ 'text-white': isHovering }"
                >
                  <v-img cover :src="v.img" aspect-ratio="1.5"></v-img>
                  <v-card-title>签名卡-{{ v.name }}</v-card-title>
                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      />
                      <div class="grey--text ms-4">4.5 (413)</div>
                    </v-row>
                    <div class="my-4 text-subtitle-1">￥ 100.00</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { useShopStore } from "@/store/shop";
import { getWebImg } from "@/utils/Index";

const shopStore = useShopStore();
const ppt = getWebImg("shirts.png");
const teamCard = getWebImg("signs.jpg");

let selectedItem = ref("T-Shirts");

const selectItems = (items: any) => {
  selectedItem.value = items[0];
};

const { name } = useDisplay();
//选手卡片图响应式比率
const bannerHeight = computed(() => {
  switch (name.value) {
    case "xs":
      return 300;
    case "sm":
      return 400;
    case "md":
      return 500;
    case "lg":
      return 600;
    case "xl":
      return 700;
    default:
      return 500;
  }
});
//选手卡片图响应式比率
const shirtRatio = computed(() => {
  switch (name.value) {
    case "xs":
      return "2";
    case "sm":
      return "2";
    case "md":
      return "1";
    case "lg":
      return "0.9";
    case "xl":
      return "1";
    default:
      return "1";
  }
});
</script>

<style scoped>
.search {
  width: 1500;
}
ul {
  margin: 30px;
}
.card {
  border: 10px solid hsla(0, 0%, 100%, 0.5);
}
</style>
