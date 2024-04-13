<template>
    <div class="home-container">
        <div class="home-header">
            <span class="left-title">面包资料屋</span>
            <h1 class="main-title">考研英语历年真题解析 + 逐词逐句翻译</h1>
            <a-button @click="showModal" class="unlock-button">{{ isActivated ? '已激活' : '未激活' }}</a-button>
        </div>
        <p class="domain-name">KyBread.com</p>

        <a-row :gutter="16" class="home-view">
            <a-col :span="12">
                <a-card title="考研英语一历年真题逐词逐句翻译解析">
                    <a-space direction="vertical">
                        <router-link v-for="year in englishOneYears" :key="year" :to="`/article/${year}/english1/1`"
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
                        <router-link v-for="year in englishTwoYears" :key="year" :to="`/article/${year}/english2/1`"
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
            <a-input v-model:value="activationCode" placeholder="请输入激活码"></a-input>
            <template #footer>
                <a-button @click="isModalVisible = false">取消</a-button>
                <a-button @click="validateCode" type="primary">验证</a-button>
            </template>
        </a-modal>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue';
export default {
    name: 'HomeView',
    setup() {

        onMounted(() => {
            const storedActivationStatus = localStorage.getItem('isActivated');
            if (storedActivationStatus === 'true') {
                isActivated.value = true;
            }
        });
        const isActivated = ref(false); // 添加激活状态变量
        const validationMessage = ref('');
        const isModalVisible = ref(false);
        const activationCode = ref('');
        function showModal() {
            isModalVisible.value = true;
        }
        async function validateCode() {
            try {
                const response = await axios.post('http://localhost:3000/validate-code', {
                    code: activationCode.value
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response, 'response');

                if (response.data.success) {
                    isActivated.value = true;
                    localStorage.setItem('isActivated', 'true')
                    message.success(response.data.message);
                    isModalVisible.value = false;
                } else {
                    message.error(response.data.message);
                }
            } catch (error) {
                console.error('激活码验证失败:', error);
                message.error('激活码验证出错，请稍后再试。');
            }
        }
        const englishOneYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
        const englishTwoYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
        return {
            englishOneYears,
            englishTwoYears,
            isModalVisible,
            activationCode,
            showModal,
            validateCode,
            isActivated
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

.home-view .a-col {
    display: flex;
    justify-content: center;
}

.domain-name {
    font-size: 20px;
    color: #666;
    text-align: center;
}

@media (max-width: 600px) {
    .ant-card {
        width: 300px;
    }

    .ant-card-head {
        width: 329px;
    }

    .home-container {
        padding: 0 20px;
    }

    .home-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /* 保持元素分散对齐 */
        align-items: center;
    }

    .home-header> :first-child {
        flex: 0 0 50%;
        /* 第一个元素占据50%的宽度 */
    }

    .home-header> :last-child {
        flex: 0 0 25%;
        /* 第三个元素占据25%的宽度 */
    }

    .home-header> :nth-child(2) {
        flex-basis: 100%;
        /* 第二个元素独占一行 */
        order: 2;
        /* 确保这个元素显示在底部 */
        text-align: center;
        /* 文本居中显示 */
        margin: 0;
    }

    .main-title {
        font-size: 20px;
        margin-bottom: 15px;
    }

    .unlock-button {
        font-size: 14px;
        margin-bottom: 15px;
    }

    .domain-name {
        font-size: 14px;
        margin-bottom: 25px;
    }

    .home-view {
        display: block;
    }

    .home-view .a-col {
        width: 100%;
        margin-bottom: 20px;
    }

    .home-view .a-button {
        font-size: 14px;
        padding: 12px 0;
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>