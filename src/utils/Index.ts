const getRandomInArray = (array: Array<any>) => {
  return array[Math.floor(Math.random() * array.length)];
};

//数据随机选择指定数目
const randomArrayUtil = (arr: Array<any>, num: number) => {
  const temp_array = [];
  for (const index in arr) {
    temp_array.push(arr[index]);
  }
  const return_array = [];
  for (let i = 0; i < num; i++) {
    if (temp_array.length > 0) {
      const arrIndex = Math.floor(Math.random() * temp_array.length);
      return_array[i] = temp_array[arrIndex];
      temp_array.splice(arrIndex, 1);
    } else {
      break;
    }
  }
  return return_array;
};

//获取本地图片
function getImage(url: string | URL) {
  return new URL(url, import.meta.url).href;
}

//获取阿里云图片地址
function getWebImg(pic: string) {
  return `http://yqymons-bank.oss-cn-beijing.aliyuncs.com/YQYMONs/images/${pic}`;
}

//随机ID：时间戳+4位随机数
function getRandomId() {
  return "t-" + new Date().getTime() + "-n-" + getRandomNum(1000, 9999);
}
//随机数生产器
function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export {
  getRandomId,
  getRandomNum,
  getImage,
  getWebImg,
  getRandomInArray,
  randomArrayUtil,
};
