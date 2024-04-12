<template>
    <div>
        <h1> 生成激活码(管理员用) </h1>
        <a-form @submit.prevent="generateCodes">
            <a-form-item>
                <span>生成数量</span>
                <a-input-number v-model:value="count" :min="1" placeholder="生成数量" style="width: 100%;" />
            </a-form-item>
            <a-form-item>
                <span>激活码长度</span>
                <a-input-number v-model:value="length" :min="1" placeholder="激活码长度" style="width: 100%;" />
            </a-form-item>
            <a-form-item>
                <span>到期日期</span>
                <a-date-picker v-model:value="expiry" placeholder="到期日期" style="width: 100%;" />
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit">生成并提交至数据库</a-button>

                <!-- {{ asd }} -->
                <ul>
                    <li v-for="(code, index) in asd" :key="index">{{ code }}</li>
                </ul>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue'; // 引入message组件

export default {
    setup() {
        const count = ref(5);
        const length = ref(15);
        const expiry = ref('');
        let asd = ref('')
        const generateCodes = async () => {
            try {
                const response = await axios.post('http://localhost:3000/generate-code', {
                    count: count.value,
                    length: length.value,
                    expiry: expiry.value ? expiry.value.format('YYYY-MM-DD') : '',
                });

                // 打印生成的激活码
                if (response.data.success) {
                    asd.value = response.data.codes
                    console.log('生成的激活码:', response.data.codes);
                    message.success(response.data.message);
                } else {
                    message.error('激活码生成失败: 未知错误');
                }
            } catch (error) {
                console.error('激活码生成失败:', error);
                message.error('激活码生成出错，请稍后再试。');
            }
        };


        return { count, length, expiry, generateCodes, asd };
    },
};
</script>