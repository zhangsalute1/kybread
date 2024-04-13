<template>
  <div>
    <a-button @click="goHome" style="margin-bottom: 20px;">
      <ArrowLeftOutlined /> 返回主页
    </a-button>
    <a-menu mode="horizontal">
      <a-menu-item key="1">
        <router-link :to="`/article/${route.params.year}/${route.params.type}/1`">Text1</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link :to="`/article/${route.params.year}/${route.params.type}/2`">Text2</router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link :to="`/article/${route.params.year}/${route.params.type}/3`">Text3</router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <router-link :to="`/article/${route.params.year}/${route.params.type}/4`">Text4</router-link>
      </a-menu-item>
    </a-menu>

    <h1>{{ articleTitle }}</h1>
    <div v-for="(paragraph, pIndex) in currentArticle.paragraphs" :key="pIndex" class="paragraph">
      <span v-for="(sentence, sIndex) in paragraph.sentences" :key="sIndex" class="sentence"
        @click="showModal(sentence)">
        {{ sentence.text }}<span v-if="sIndex < paragraph.sentences.length - 1">. </span>
      </span>
    </div>

    <a-modal v-model:open="isModalVisible" :title="modalTitle" @cancel="isModalVisible = false"
      :style="{ width: '80vw' }">
      <p v-html="selectedSentenceHtml"></p>
      <template #footer>
        <a-button @click="isModalVisible = false">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { Menu } from 'ant-design-vue';
import MarkdownIt from 'markdown-it';
//2010
import Text1_2010_english1 from '../../article/2010年考研英语一Text1.json';
import Text2_2010_english1 from '../../article/2010年考研英语一Text2.json';
import Text3_2010_english1 from '../../article/2010年考研英语一Text3.json';
import Text4_2010_english1 from '../../article/2010年考研英语一Text4.json';

import Text1_2010_english2 from '../../article/2010年考研英语二Text1.json';
import Text2_2010_english2 from '../../article/2010年考研英语二Text2.json';
import Text3_2010_english2 from '../../article/2010年考研英语二Text3.json';
import Text4_2010_english2 from '../../article/2010年考研英语二Text4.json';
// 2011
import Text1_2011_english1 from '../../article/2011年考研英语一Text1.json';
import Text2_2011_english1 from '../../article/2011年考研英语一Text2.json';
import Text3_2011_english1 from '../../article/2011年考研英语一Text3.json';
import Text4_2011_english1 from '../../article/2011年考研英语一Text4.json';

import Text1_2011_english2 from '../../article/2011年考研英语二Text1.json';
import Text2_2011_english2 from '../../article/2011年考研英语二Text2.json';
import Text3_2011_english2 from '../../article/2011年考研英语二Text3.json';
import Text4_2011_english2 from '../../article/2011年考研英语二Text4.json';

// 2012
import Text1_2012_english1 from '../../article/2012年考研英语一Text1.json';
import Text2_2012_english1 from '../../article/2012年考研英语一Text2.json';
import Text3_2012_english1 from '../../article/2012年考研英语一Text3.json';
import Text4_2012_english1 from '../../article/2012年考研英语一Text4.json';

import Text1_2012_english2 from '../../article/2012年考研英语二Text1.json';
import Text2_2012_english2 from '../../article/2012年考研英语二Text2.json';
import Text3_2012_english2 from '../../article/2012年考研英语二Text3.json';
import Text4_2012_english2 from '../../article/2012年考研英语二Text4.json';

// 2013
import Text1_2013_english1 from '../../article/2013年考研英语一Text1.json';
import Text2_2013_english1 from '../../article/2013年考研英语一Text2.json';
import Text3_2013_english1 from '../../article/2013年考研英语一Text3.json';
import Text4_2013_english1 from '../../article/2013年考研英语一Text4.json';

import Text1_2013_english2 from '../../article/2013年考研英语二Text1.json';
import Text2_2013_english2 from '../../article/2013年考研英语二Text2.json';
import Text3_2013_english2 from '../../article/2013年考研英语二Text3.json';
import Text4_2013_english2 from '../../article/2013年考研英语二Text4.json';

// 2014
import Text1_2014_english1 from '../../article/2014年考研英语一Text1.json';
import Text2_2014_english1 from '../../article/2014年考研英语一Text2.json';
import Text3_2014_english1 from '../../article/2014年考研英语一Text3.json';
import Text4_2014_english1 from '../../article/2014年考研英语一Text4.json';

import Text1_2014_english2 from '../../article/2014年考研英语二Text1.json';
import Text2_2014_english2 from '../../article/2014年考研英语二Text2.json';
import Text3_2014_english2 from '../../article/2014年考研英语二Text3.json';
import Text4_2014_english2 from '../../article/2014年考研英语二Text4.json';

// 2015
import Text1_2015_english1 from '../../article/2015年考研英语一Text1.json';
import Text2_2015_english1 from '../../article/2015年考研英语一Text2.json';
import Text3_2015_english1 from '../../article/2015年考研英语一Text3.json';
import Text4_2015_english1 from '../../article/2015年考研英语一Text4.json';

import Text1_2015_english2 from '../../article/2015年考研英语二Text1.json';
import Text2_2015_english2 from '../../article/2015年考研英语二Text2.json';
import Text3_2015_english2 from '../../article/2015年考研英语二Text3.json';
import Text4_2015_english2 from '../../article/2015年考研英语二Text4.json';

// 2016
import Text1_2016_english1 from '../../article/2016年考研英语一Text1.json';
import Text2_2016_english1 from '../../article/2016年考研英语一Text2.json';
import Text3_2016_english1 from '../../article/2016年考研英语一Text3.json';
import Text4_2016_english1 from '../../article/2016年考研英语一Text4.json';

import Text1_2016_english2 from '../../article/2016年考研英语二Text1.json';
import Text2_2016_english2 from '../../article/2016年考研英语二Text2.json';
import Text3_2016_english2 from '../../article/2016年考研英语二Text3.json';
import Text4_2016_english2 from '../../article/2016年考研英语二Text4.json';

// 2017
import Text1_2017_english1 from '../../article/2017年考研英语一Text1.json';
import Text2_2017_english1 from '../../article/2017年考研英语一Text2.json';
import Text3_2017_english1 from '../../article/2017年考研英语一Text3.json';
import Text4_2017_english1 from '../../article/2017年考研英语一Text4.json';

import Text1_2017_english2 from '../../article/2017年考研英语二Text1.json';
import Text2_2017_english2 from '../../article/2017年考研英语二Text2.json';
import Text3_2017_english2 from '../../article/2017年考研英语二Text3.json';
import Text4_2017_english2 from '../../article/2017年考研英语二Text4.json';

// 2018
import Text1_2018_english1 from '../../article/2018年考研英语一Text1.json';
import Text2_2018_english1 from '../../article/2018年考研英语一Text2.json';
import Text3_2018_english1 from '../../article/2018年考研英语一Text3.json';
import Text4_2018_english1 from '../../article/2018年考研英语一Text4.json';

import Text1_2018_english2 from '../../article/2018年考研英语二Text1.json';
import Text2_2018_english2 from '../../article/2018年考研英语二Text2.json';
import Text3_2018_english2 from '../../article/2018年考研英语二Text3.json';
import Text4_2018_english2 from '../../article/2018年考研英语二Text4.json';

// 2019
import Text1_2019_english1 from '../../article/2019年考研英语一Text1.json';
import Text2_2019_english1 from '../../article/2019年考研英语一Text2.json';
import Text3_2019_english1 from '../../article/2019年考研英语一Text3.json';
import Text4_2019_english1 from '../../article/2019年考研英语一Text4.json';

import Text1_2019_english2 from '../../article/2019年考研英语二Text1.json';
import Text2_2019_english2 from '../../article/2019年考研英语二Text2.json';
import Text3_2019_english2 from '../../article/2019年考研英语二Text3.json';
import Text4_2019_english2 from '../../article/2019年考研英语二Text4.json';

// 2020
import Text1_2020_english1 from '../../article/2020年考研英语一Text1.json';
import Text2_2020_english1 from '../../article/2020年考研英语一Text2.json';
import Text3_2020_english1 from '../../article/2020年考研英语一Text3.json';
import Text4_2020_english1 from '../../article/2020年考研英语一Text4.json';

import Text1_2020_english2 from '../../article/2020年考研英语二Text1.json';
import Text2_2020_english2 from '../../article/2020年考研英语二Text2.json';
import Text3_2020_english2 from '../../article/2020年考研英语二Text3.json';
import Text4_2020_english2 from '../../article/2020年考研英语二Text4.json';

// 2021
import Text1_2021_english1 from '../../article/2021年考研英语一Text1.json';
import Text2_2021_english1 from '../../article/2021年考研英语一Text2.json';
import Text3_2021_english1 from '../../article/2021年考研英语一Text3.json';
import Text4_2021_english1 from '../../article/2021年考研英语一Text4.json';

import Text1_2021_english2 from '../../article/2021年考研英语二Text1.json';
import Text2_2021_english2 from '../../article/2021年考研英语二Text2.json';
import Text3_2021_english2 from '../../article/2021年考研英语二Text3.json';
import Text4_2021_english2 from '../../article/2021年考研英语二Text4.json';

// 2022
import Text1_2022_english1 from '../../article/2022年考研英语一Text1.json';
import Text2_2022_english1 from '../../article/2022年考研英语一Text2.json';
import Text3_2022_english1 from '../../article/2022年考研英语一Text3.json';
import Text4_2022_english1 from '../../article/2022年考研英语一Text4.json';

import Text1_2022_english2 from '../../article/2022年考研英语二Text1.json';
import Text2_2022_english2 from '../../article/2022年考研英语二Text2.json';
import Text3_2022_english2 from '../../article/2022年考研英语二Text3.json';
import Text4_2022_english2 from '../../article/2022年考研英语二Text4.json';

// 2023
import Text1_2023_english1 from '../../article/2023年考研英语一Text1.json';
import Text2_2023_english1 from '../../article/2023年考研英语一Text2.json';
import Text3_2023_english1 from '../../article/2023年考研英语一Text3.json';
import Text4_2023_english1 from '../../article/2023年考研英语一Text4.json';

import Text1_2023_english2 from '../../article/2023年考研英语二Text1.json';
import Text2_2023_english2 from '../../article/2023年考研英语二Text2.json';
import Text3_2023_english2 from '../../article/2023年考研英语二Text3.json';
import Text4_2023_english2 from '../../article/2023年考研英语二Text4.json';

export default {
  name: 'ArticleView',
  components: {
    ArrowLeftOutlined,
    Menu,
    MenuItem: Menu.Item,
  },
  setup() {

    console.log(Text1_2010_english1);
    const router = useRouter();
    const route = useRoute();
    const isModalVisible = ref(false);
    const selectedSentenceAnalysis = ref('');

    const jsonDataMap = {
      english1: {
        '2010': [Text1_2010_english1, Text2_2010_english1, Text3_2010_english1, Text4_2010_english1],
        '2011': [Text1_2011_english1, Text2_2011_english1, Text3_2011_english1, Text4_2011_english1],
        '2012': [Text1_2012_english1, Text2_2012_english1, Text3_2012_english1, Text4_2012_english1],
        '2013': [Text1_2013_english1, Text2_2013_english1, Text3_2013_english1, Text4_2013_english1],
        '2014': [Text1_2014_english1, Text2_2014_english1, Text3_2014_english1, Text4_2014_english1],
        '2015': [Text1_2015_english1, Text2_2015_english1, Text3_2015_english1, Text4_2015_english1],
        '2016': [Text1_2016_english1, Text2_2016_english1, Text3_2016_english1, Text4_2016_english1],
        '2017': [Text1_2017_english1, Text2_2017_english1, Text3_2017_english1, Text4_2017_english1],
        '2018': [Text1_2018_english1, Text2_2018_english1, Text3_2018_english1, Text4_2018_english1],
        '2019': [Text1_2019_english1, Text2_2019_english1, Text3_2019_english1, Text4_2019_english1],
        '2020': [Text1_2020_english1, Text2_2020_english1, Text3_2020_english1, Text4_2020_english1],
        '2021': [Text1_2021_english1, Text2_2021_english1, Text3_2021_english1, Text4_2021_english1],
        '2022': [Text1_2022_english1, Text2_2022_english1, Text3_2022_english1, Text4_2022_english1],
        '2023': [Text1_2023_english1, Text2_2023_english1, Text3_2023_english1, Text4_2023_english1]
      },
      english2: {
        '2010': [Text1_2010_english2, Text2_2010_english2, Text3_2010_english2, Text4_2010_english2],
        '2011': [Text1_2011_english2, Text2_2011_english2, Text3_2011_english2, Text4_2011_english2],
        '2012': [Text1_2012_english2, Text2_2012_english2, Text3_2012_english2, Text4_2012_english2],
        '2013': [Text1_2013_english2, Text2_2013_english2, Text3_2013_english2, Text4_2013_english2],
        '2014': [Text1_2014_english2, Text2_2014_english2, Text3_2014_english2, Text4_2014_english2],
        '2015': [Text1_2015_english2, Text2_2015_english2, Text3_2015_english2, Text4_2015_english2],
        '2016': [Text1_2016_english2, Text2_2016_english2, Text3_2016_english2, Text4_2016_english2],
        '2017': [Text1_2017_english2, Text2_2017_english2, Text3_2017_english2, Text4_2017_english2],
        '2018': [Text1_2018_english2, Text2_2018_english2, Text3_2018_english2, Text4_2018_english2],
        '2019': [Text1_2019_english2, Text2_2019_english2, Text3_2019_english2, Text4_2019_english2],
        '2020': [Text1_2020_english2, Text2_2020_english2, Text3_2020_english2, Text4_2020_english2],
        '2021': [Text1_2021_english2, Text2_2021_english2, Text3_2021_english2, Text4_2021_english2],
        '2022': [Text1_2022_english2, Text2_2022_english2, Text3_2022_english2, Text4_2022_english2],
        '2023': [Text1_2023_english2, Text2_2023_english2, Text3_2023_english2, Text4_2023_english2]
      }
    };


    const currentArticle = ref([]);
    const modalTitle = ref('');
    const mdParser = new MarkdownIt();
    const selectedSentenceHtml = ref('');
    onMounted(() => {
      loadData()
    });

    const articleTitle = computed(() => `${route.params.year}年考研英语${route.params.type === 'english1' ? '一' : '二'} Text${route.params.textNumber}`);

    function goHome() {
      router.push('/');
    }

    function showModal(sentence) {
      selectedSentenceAnalysis.value = sentence.explainMd;
      selectedSentenceHtml.value = mdParser.render(sentence.explainMd); // 解析 Markdown 为 HTML
      modalTitle.value = sentence.text;
      isModalVisible.value = true;
    }
    watch(() => route.params, (newParams, oldParams) => {
      if (newParams && newParams.year && newParams.type && newParams.textNumber &&
        (newParams.year !== oldParams.year || newParams.type !== oldParams.type || newParams.textNumber !== oldParams.textNumber)) {
        loadData();
      }
    });


    function loadData() {
      const year = route.params.year;
      const type = route.params.type;
      const textNumber = route.params.textNumber - 1; // 文章索引，从0开始
      const selectedTexts = jsonDataMap[type]?.[year];

      console.log("Selected Texts:", selectedTexts); // 查看加载的数据结构

      if (selectedTexts && selectedTexts.length > textNumber) {
        currentArticle.value = selectedTexts[textNumber];
        console.log("currentArticle.value:", currentArticle.value); // 确认数据已经加载
      } else {
        console.log("Data not found or invalid textNumber:", textNumber);
        currentArticle.value = []; // 确保总是有合法的数组格式
      }
    }

    return {
      currentArticle,
      articleTitle,
      showModal,
      isModalVisible,
      selectedSentenceAnalysis,
      goHome,
      route,
      router,
      modalTitle,
      selectedSentenceHtml
    };
  },
};
</script>

<style scoped>
/* .sentence {
  cursor: pointer;
  margin-bottom: 10px;
}

.sentence:hover {
  text-decoration: underline;
} */

.paragraph {
  margin-bottom: 20px;
  /* 段落之间的间距 */
}

.sentence {
  cursor: pointer;
  display: inline;
  /* 保证句子在一行显示 */
}

.sentence:hover {
  text-decoration: underline;
  /* 鼠标悬停时下划线 */
}
</style>
