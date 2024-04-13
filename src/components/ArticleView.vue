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
    <div v-for="(sentence, index) in currentArticle" :key="index" class="sentence" @click="showModal(sentence)">
      {{ sentence.text }}
    </div>
    <a-modal v-model:open="isModalVisible" :title="modalTitle" @cancel="isModalVisible = false">
      <p v-html="selectedSentenceAnalysis"></p>
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
import Text1_2010_english1 from '../../article/2010年考研英语一Text1.json';
import Text2_2010_english1 from '../../article/2010年考研英语一Text2.json';
import Text3_2010_english1 from '../../article/2010年考研英语一Text3.json';
import Text4_2010_english1 from '../../article/2010年考研英语一Text4.json';

import Text1_2010_english2 from '../../article/2010年考研英语二Text1.json';
import Text2_2010_english2 from '../../article/2010年考研英语二Text2.json';
import Text3_2010_english2 from '../../article/2010年考研英语二Text3.json';
import Text4_2010_english2 from '../../article/2010年考研英语二Text4.json';

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
        // Include data for other years
      },
      english2: {
        '2010': [Text1_2010_english2, Text2_2010_english2, Text3_2010_english2, Text4_2010_english2],
        // Include data for other years
      },
    };

    const currentArticle = ref([]);
    const modalTitle = ref('');

    onMounted(() => {
      loadData()
      const year = route.params.year;
      console.log(year, 'year');
      const type = route.params.type;
      console.log(type, 'type');
      const textNumber = route.params.textNumber - 1;
      console.log(route.params, 'route.params');
      console.log(jsonDataMap, 'jsonDataMap');
      const selectedTexts = jsonDataMap[type]?.[year];
      console.log(textNumber, 'textNumber');
      console.log(selectedTexts, 'selectedTexts');
      if (selectedTexts && selectedTexts.length > textNumber) {
        currentArticle.value = selectedTexts[textNumber].paragraphs.flatMap(paragraph => paragraph.sentences);
      }
    });

    const articleTitle = computed(() => `${route.params.year}年考研英语${route.params.type === 'english1' ? '一' : '二'} Text${route.params.textNumber}`);

    function goHome() {
      router.push('/');
    }

    function showModal(sentence) {
      selectedSentenceAnalysis.value = sentence.explainMd;
      modalTitle.value = sentence.text; // 设置模态框标题为当前句子
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
      const textNumber = route.params.textNumber - 1;
      const selectedTexts = jsonDataMap[type]?.[year];
      if (selectedTexts && selectedTexts.length > textNumber) {
        currentArticle.value = selectedTexts[textNumber].paragraphs.flatMap(paragraph => paragraph.sentences);
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
      modalTitle
    };
  },
};
</script>

<style scoped>
.sentence {
  cursor: pointer;
  margin-bottom: 10px;
}

.sentence:hover {
  text-decoration: underline;
}
</style>
