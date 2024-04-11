<template>
  <div>
    <a-button @click="goHome" style="margin-bottom: 20px;">
      <ArrowLeftOutlined /> 返回主页
    </a-button>
    <h1>{{ articleTitle }}</h1>
    <div v-for="(sentence, index) in currentArticle" :key="index" class="sentence" @click="showModal(sentence)">
      {{ sentence.text }}
    </div>
    <a-modal v-model:open="isModalVisible" :title="modalTitle" @cancel="isModalVisible = false">
      <p>{{ selectedSentenceAnalysis }}</p>
      <template #footer>
        <a-button @click="isModalVisible = false">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';

export default {
  name: 'ArticleView',
  components: {
    ArrowLeftOutlined,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isModalVisible = ref(false);
    const selectedSentenceAnalysis = ref('');
    const modalTitle = computed(() => `${route.params.year}年考研英语${route.params.type === 'english1' ? '一' : '二'}真题及解析逐词逐句详解 KyBread.com`);
    // 模拟的文章数据
    const articles = ref({
      english1: {
        "2023": [
          { text: '2023年考研英语一示例句子1。', analysis: '这是2023年句子1的解析，关于现代科技的影响。' },
          { text: '2023年考研英语一示例句子2。', analysis: '这是2023年句子2的解析，讨论全球化的挑战。' },
        ],
        "2022": [
          { text: '2022年考研英语一示例句子1。', analysis: '这是2022年句子1的解析，探讨教育的重要性。' },
          { text: '2022年考研英语一示例句子2。', analysis: '这是2022年句子2的解析，分析气候变化的后果。' },
        ],
        "2021": [
          { text: '2021年考研英语一示例句子1。', analysis: '这是2021年句子1的解析，关于社交媒体的影响。' },
          { text: '2021年考研英语一示例句子2。', analysis: '这是2021年句子2的解析，讨论创新对经济的驱动作用。' },
        ],
      },
      english2: {
        "2023": [
          { text: '2023年考研英语二示例句子1。', analysis: '这是2023年句子1的解析，讨论人工智能的伦理问题。' },
          { text: '2023年考研英语二示例句子2。', analysis: '这是2023年句子2的解析，分析文化多样性的重要性。' },
        ],
        "2022": [
          { text: '2022年考研英语二示例句子1。', analysis: '这是2022年句子1的解析，关于可持续发展的讨论。' },
          { text: '2022年考研英语二示例句子2。', analysis: '这是2022年句子2的解析，探索城市化的挑战和机遇。' },
        ],
        "2021": [
          { text: '2021年考研英语二示例句子1。', analysis: '这是2021年句子1的解析，讨论全球卫生问题。' },
          { text: '2021年考研英语二示例句子2。', analysis: '这是2021年句子2的解析，分析技术进步对就业的影响。' },
        ],
      }
    });


    const currentArticle = computed(() => {
      const type = route.params.type; // 'english1' 或 'english2'
      const year = route.params.year;
      return articles.value?.[type]?.[year] || [];
    });

    const articleTitle = computed(() => `${route.params.year}年考研英语${route.params.type === 'english1' ? '一' : '二'}历年真题`);

    function goHome() {
      router.push('/');
    }

    function showModal(sentence) {
      selectedSentenceAnalysis.value = sentence.analysis;
      isModalVisible.value = true;
    }

    return {
      currentArticle,
      articleTitle,
      showModal,
      isModalVisible,
      selectedSentenceAnalysis,
      goHome,
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
