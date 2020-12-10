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
      <ant-tabs
        :active-key="customActiveKey"
        :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <ant-tab-pane key="tab1" tab="账号密码登录">
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
        </ant-tab-pane>
        <ant-tab-pane key="tab2" tab="手机号登录">
          <ant-form-item v-bind="validateInfos.mobile">
            <ant-input :value="userForm.mobile" size="large" type="text" placeholder="手机号">
              <template #prefix><MobileOutlined :style="{ color: 'rgba(0,0,0,.25)' }" type="mobile" /></template>
            </ant-input>
          </ant-form-item>
          <ant-row :gutter="16">
            <ant-col class="gutter-row" :span="16">
              <ant-form-item v-bind="validateInfos.captcha">
                <ant-input :value="userForm.captcha" size="large" type="text" placeholder="验证码">
                  <template #prefix><MailOutlined :style="{ color: 'rgba(0,0,0,.25)' }" type="captcha" /></template>
                </ant-input>
              </ant-form-item>
            </ant-col>
            <ant-col class="gutter-row" :span="8">
              <ant-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.formState.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.formState.smsSendBtn && '获取验证码' || (state.formState.time+' s')"
              />
            </ant-col>
          </ant-row>
        </ant-tab-pane>
      </ant-tabs>

      <ant-form-item>
        <ant-checkbox :checked="state.rememberMe">自动登录</ant-checkbox>
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
import { Form, Tabs, Input, Row, Col, Button, Checkbox } from 'ant-design-vue'
import { useForm } from '@ant-design-vue/use'
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons-vue'

interface userLoginInfo {
    username?:string | number,
    password?:string | number,
    mobile?:number,
    captcha?:number
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    'ant-form': Form,
    'ant-form-item': Form.Item,
    'ant-tabs': Tabs,
    'ant-tab-pane': Tabs.TabPane,
    'ant-input': Input,
    'ant-input-password': Input.Password,
    'ant-button': Button,
    'ant-row': Row,
    'ant-col': Col,
    'ant-checkbox': Checkbox
  },
  setup() {
    /**
       * 用户登录信息
       */
    const userForm = reactive<userLoginInfo>({
      username: '',
      password: '',
      mobile: undefined,
      captcha: undefined
    })
    const customActiveKey = ref('tab1')
    const formRules = reactive(
      customActiveKey.value === 'tab1' ? {
        username: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      } : {
        mobile: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'change' }]
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
    const handleTabClick = (key:string) => { customActiveKey.value = key }
    const getCaptcha = () => {}
    /**
     * 提交表单
     */
    const { resetFields, validate, validateInfos } = useForm(userForm, formRules)
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
