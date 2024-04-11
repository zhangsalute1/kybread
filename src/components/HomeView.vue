<template>
    <div class="home-container">
        <div class="home-header">
            <h1 class="main-title">考研英语历年真题解析 + 逐词逐句翻译</h1>
            <p class="domain-name">KyBread.com</p>
        </div>
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
    </div>
</template>


<script>
export default {
    name: 'HomeView',
    setup() {
        const englishOneYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
        const englishTwoYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
        return {
            englishOneYears,
            englishTwoYears,
        };
    },
};
</script>

<style scoped>
.home-view .a-col {
    display: flex;
    justify-content: center;
}

.home-container {
    text-align: center;
    /* 让标题和域名居中显示 */
}

.home-header {
    margin-bottom: 20px;
    /* 在标题部分和卡片之间添加一些间隔 */
}

.main-title {
    margin: 0;
    color: #1890ff;
    /* 给主标题设置一个蓝色调 */
    margin-bottom: 10px;
    /* 主标题和域名之间的间距 */
}

.domain-name {
    font-size: 20px;
    /* 域名的字体大小 */
    color: #666;
    /* 域名的颜色 */
}
</style>