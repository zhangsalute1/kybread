<template>
    <div class="login-container">
        <h1>管理员登录</h1>
        <a-form @submit.prevent="validateLogin">
            <a-form-item>
                <a-input v-model:value="username" placeholder="用户名" />
            </a-form-item>
            <a-form-item>
                <a-input-password v-model:value="password" placeholder="密码" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Input, Button, message } from 'ant-design-vue';

export default {
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-input-password': Input.Password,
        'a-button': Button,
    },
    setup() {
        const username = ref('');
        const password = ref('');
        const router = useRouter();

        const validateLogin = () => {
            if (username.value === 'admin' && password.value === 'admin123') {
                message.success('登录成功');
                router.push({ name: 'GenerateCodes' });
            } else {
                message.error('无效的登录凭证');
            }
        };

        return { username, password, validateLogin };
    },
};
</script>

<!-- 样式同之前保持不变 -->
<style>
.login-container {
    max-width: 300px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
</style>