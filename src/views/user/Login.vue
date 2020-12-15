<template>
  <div class="main">
    <ant-form class="user-layout-login">
      <ant-alert v-if="loginErrorShow" type="error" show-icon style="margin-bottom: 24px;" message="账户或密码错误（admin/123456 )" />
      <ant-form-item v-bind="validateInfos.username">
        <ant-input v-model:value="userForm.username" size="large" type="text" placeholder="账户: admin">
          <template #prefix><user-outlined :style="{ color: 'rgba(0,0,0,.25)' }" type="user" /></template>
        </ant-input>
      </ant-form-item>
      <ant-form-item v-bind="validateInfos.password">
        <ant-input-password v-model:value="userForm.password" size="large" placeholder="密码: admin or ant.design">
          <template #prefix><LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" type="lock" /></template>
        </ant-input-password>
      </ant-form-item>
      <ant-form-item>
        <ant-checkbox v-model:checked="state.rememberMe">自动登录</ant-checkbox>
        <router-link
          :to="{ name: 'login' }"
          class="forge-password"
          style="float: right;"
        >
          忘记密码
        </router-link>
      </ant-form-item>
      <ant-form-item style="margin-top:24px">
        <ant-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="state.formState.loginBtn"
          :disabled="state.formState.loginBtn"
          @click="handleSubmit"
        >
          确定
        </ant-button>
      </ant-form-item>
    </ant-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Input, Button, Checkbox, Alert } from 'ant-design-vue'
import { useForm } from '@ant-design-vue/use'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '@/api/user'

interface userLoginInfo {
    username?:string | number,
    password?:string | number,
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    'ant-form': Form,
    'ant-form-item': Form.Item,
    'ant-input': Input,
    'ant-input-password': Input.Password,
    'ant-button': Button,
    'ant-checkbox': Checkbox,
    'ant-alert': Alert
  },
  setup() {
    const router = useRouter()
    /**
     * 用户登录信息
     */
    const loginErrorShow = ref(false)
    const userForm = reactive<userLoginInfo>({
      username: '',
      password: ''
    })
    const customActiveKey = ref('tab1')
    const formRules = reactive({
      username: [{ required: true, message: '请输入账号', trigger: 'change' }],
      password: [{ required: true, message: '请输入密码', trigger: 'change' }]
    })
    /**
     * 其他信息
     */
    const state = reactive({
      isLoginError: false,
      rememberMe: false,
      formState: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    })
    /**
     * 提交表单
     */
    const { resetFields, validate, validateInfos } = useForm(userForm, formRules)
    const handleSubmit = (e:any) => {
      e.preventDefault()
      state.formState.loginBtn = true
      validate().then(async() => {
        const { code } = await login(userForm)
        setTimeout(() => {
          state.formState.loginBtn = false
          if (code === '0000') router.push({ path: '/' })
          else loginErrorShow.value = true
        }, 600)
      }).catch(err => {
        console.log('error', err)
        state.formState.loginBtn = false
      })
    }

    return {
      state,
      customActiveKey,
      userForm,
      validateInfos,
      resetFields,
      handleSubmit,
      loginErrorShow
    }
  }
})
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
