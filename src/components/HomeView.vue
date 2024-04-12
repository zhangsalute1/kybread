<template>
    <div class="home-container">
        <div class="home-header">
            <span class="left-title">面包资料屋</span>
            <h1 class="main-title">考研英语历年真题解析 + 逐词逐句翻译</h1>
            <a-button @click="showModal" class="unlock-button">未解锁</a-button>
        </div>
        <p class="domain-name">KyBread.com</p>

        <a-row :gutter="16" class="home-view">
            <a-col :span="12">
                <a-card title="考研英语一历年真题逐词逐句翻译解析">
                    <a-space direction="vertical">
                        <router-link v-for="year in englishOneYears" :key="year" :to="`/article/english1/${year}`"
                            tag="span">
                            <a-button>
                                {{ year }}年考研英语一历年真题逐词逐句
                            </a-button>
                        </router-link>
                    </a-space>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card title="考研英语二历年真题逐词逐句翻译解析">
                    <a-space direction="vertical">
                        <router-link v-for="year in englishTwoYears" :key="year" :to="`/article/english2/${year}`"
                            tag="span">
                            <a-button>
                                {{ year }}年考研英语二历年真题逐词逐句
                            </a-button>
                        </router-link>
                    </a-space>
                </a-card>
            </a-col>
        </a-row>
        <a-modal v-model:open="isModalVisible" title="输入激活码" :width="300">
            <p>解锁全部文章（逐句讲解）</p>
            <a href="https://www.youpumao.xyz/um2mAr" target="_blank">激活码购买</a>
            <a-input v-model="activationCode" placeholder="请输入激活码"></a-input>
            <template #footer>
                <a-button @click="isModalVisible = false">取消</a-button>
                <a-button @click="validateCode" type="primary">验证</a-button>
            </template>
        </a-modal>
    </div>
</template>


<script>
import { ref } from 'vue'
export default {
    name: 'HomeView',
    setup() {
        const isModalVisible = ref(false);
        const activationCode = ref('');
        function showModal() {
            isModalVisible.value = true;
        }
        function validateCode() {
            console.log("验证激活码:", activationCode.value);
            // 在这里添加验证激活码的逻辑
            // 若激活码正确，可以通过router.push跳转或者解锁内容
        }
        const englishOneYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
        const englishTwoYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
        return {
            englishOneYears,
            englishTwoYears,
            isModalVisible,
            activationCode,
            showModal,
            validateCode
        };
    },
};
</script>

<style scoped>
.home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.left-title,
.main-title,
.unlock-button {
    margin: 10px 0;
}

.main-title {
    flex-grow: 1;
    text-align: center;
    color: #1890ff;
}

/* Adjusted for scoped styles */
.home-view .a-col {
    display: flex;
    justify-content: center;
}

.domain-name {
    font-size: 20px;
    color: #666;
    text-align: center;
}
</style>