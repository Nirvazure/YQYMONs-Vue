<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      density="compact"
      items-per-page="100"
      hide-default-footer
    >
      <template #top>
        <v-btn color="primary" class="mb-2" @click="dialog = true"
          >新增款项
        </v-btn>
      </template>
      <template #item.name="{ item }">
        <v-edit-dialog :return-value.sync="item.name" @save="onEdit">
          <span v-if="editingRowId !== item.id">{{ item.name }}</span>
          <template #input>
            <v-text-field
              v-model="item.name"
              label="项目名称"
              single-line
              dense
              :id="`edit-name-${item.id}`"
              @focus="$event.target.select()"
              @blur="editingRowId = null"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template #item.amount="{ item }">
        <v-edit-dialog :return-value.sync="item.amount" @save="onEdit">
          {{ item.amount }}
          <template #input>
            <v-text-field
              v-model.number="item.amount"
              type="number"
              label="金额"
              single-line
              dense
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template #item.type="{ item }">
        <v-chip :color="typeColor(item.type)" text-color="white" small label>
          {{ item.type }}
        </v-chip>
      </template>
      <template #item.remark="{ item }">
        <v-edit-dialog :return-value.sync="item.remark" @save="onEdit">
          {{ item.remark }}
          <template #input>
            <v-text-field
              v-model="item.remark"
              label="备注"
              single-line
              dense
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <div>
          预存款剩余总额：<span class="font-weight-bold">￥{{ remain }}</span>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div>
          直接支出总额：<span class="font-weight-bold"
            >￥{{ directTotal }}</span
          >
        </div>
      </v-col>
    </v-row>

    <!-- 新增款项对话框 -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>新增装修款项</v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="formValid">
            <v-text-field
              v-model="form.name"
              label="项目名称"
              :rules="[(v) => !!v || '必填']"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="form.amount"
              label="金额"
              type="number"
              :rules="[(v) => v >= 0 || '金额需为正数']"
              required
            ></v-text-field>
            <v-select
              v-model="form.type"
              :items="typeOptions"
              label="类型"
              required
            ></v-select>
            <v-text-field v-model="form.remark" label="备注"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">取消</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="submitForm"
            >确定</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { decorationItems } from "@/mock/decoration";
import { ref, computed, nextTick } from "vue";

interface RowItem {
  id: number;
  name: string;
  amount: number;
  type: string;
  remark: string;
  date: string;
  from: string;
}

const headers = [
  { text: "项目", value: "name", align: "start" as const },
  { text: "来源", value: "from" },
  { text: "金额", value: "amount" },
  { text: "类型", value: "type" },
  { text: "日期", value: "date" },
  { text: "备注", value: "remark" },
  { text: "操作", value: "actions", sortable: false },
];

const typeOptions = ["预存款", "直接支出", "押金"];

const items = ref<RowItem[]>(
  decorationItems.map((item) => ({
    ...item,
    amount: Number(item.amount),
  }))
);

let nextId = 4;
const editingRowId = ref<number | null>(null);

// 对话框相关
const dialog = ref(false);
const form = ref<RowItem>({
  id: 0,
  name: "",
  amount: 0,
  type: "预存款",
  remark: "",
  date: "",
  from: "",
});
const formValid = ref(false);
const formRef = ref();

const closeDialog = () => {
  dialog.value = false;
  form.value = {
    id: 0,
    name: "",
    amount: 0,
    type: "预存款",
    remark: "",
    date: "",
    from: "",
  };
  nextTick(() => formRef.value?.resetValidation?.());
};

const submitForm = () => {
  if (!formValid.value) return;
  items.value.push({ ...form.value, id: nextId++ });
  closeDialog();
};

const removeRow = (id: number) => {
  items.value = items.value.filter((item) => item.id !== id);
};

const onEdit = () => {
  // 这里可以做数据校验或保存
};

const prepayTotal = computed(() =>
  items.value
    .filter((i) => i.type === "预存款")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0)
);
const directTotal = computed(() =>
  items.value
    .filter((i) => i.type === "直接支出")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0)
);

const remain = computed(() => {
  return 50000 - prepayTotal.value;
});

const typeColor = (type: string) => {
  switch (type) {
    case "预存款":
      return "blue";
    case "直接支出":
      return "green";
    case "押金":
      return "orange";
    default:
      return "grey";
  }
};
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
  color: #1976d2;
}

/* 美化表头 */
.v-data-table thead th {
  background: #f5f7fa;
  color: #333;
  font-weight: bold;
}
</style>
