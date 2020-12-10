<template>
  <div class="main">
    <ant-form
      id="formLogin"
      ref="formLogin"
      class="user-layout-login"
      :form="userForm"
      :rules="state.rules"
      @submit="handleSubmit"
    >
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
        >
          确定
        </ant-button>
      </ant-form-item>
    </ant-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw, ref } from 'vue'
import { Form, Input, Button, Checkbox } from 'ant-design-vue'
import { useForm } from '@ant-design-vue/use'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons-vue'

interface userLoginInfo {
    username?:string | number,
    password?:string | number,
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    'ant-form': Form,
    'ant-form-item': Form.Item,
    'ant-input': Input,
    'ant-input-password': Input.Password,
    'ant-button': Button,
    'ant-checkbox': Checkbox
  },
  setup() {
    /**
       * 用户登录信息
       */
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
     * tab切换
     */
    const { resetFields, validate, validateInfos } = useForm(userForm, formRules)
    const handleTabClick = (key:string) => {
      customActiveKey.value = key
      resetFields()
    }
    const getCaptcha = () => {}
    /**
     * 提交表单
     */
    const handleSubmit = (e:any) => {
      e.preventDefault()
      validate().then(() => {
        console.log(toRaw(userForm))
      }).catch(err => {
        console.log('error', err)
      })
    }

    return {
      state,
      customActiveKey,
      userForm,
      validateInfos,
      resetFields,
      getCaptcha,
      handleTabClick,
      handleSubmit
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
