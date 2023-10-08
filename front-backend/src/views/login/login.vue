<template>
  <div id="login">
    <el-card class="login-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>登录</span>
        <el-switch style="float: right; padding: 3px 0"
        v-model="loginType"
        active-text="客户"
        inactive-text="雇员"></el-switch>
      </div>
      <el-form :model="loginForm" v-if="loginType">
        <el-form-item>
          <el-input placeholder="手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="验证码 (123456)" v-model="loginForm.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="loginEmpForm" v-else>
        <el-form-item>
          <el-input placeholder="用户名（peter）" v-model="loginEmpForm.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码 (123456)" v-model="loginEmpForm.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { isMobile } from "@/util/validate"
  import { cryptoPasswd } from "@/util/util"

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          phone: '',
          code: ''
        },
        loginEmpForm: {
          user: '',
          code: ''
        },
        loginType: true
      };
    },
    created() {
    },
    methods: {
      customerLogin() {
        if (!isMobile(this.loginForm.phone)) {
          this.$message.error("请输入正确的手机号！");
        } else if (parseInt(this.loginForm.code) !== 123456) {
          this.$message.error("请输入正确的验证码！");
        } else {
          const gql = `mutation { login(input: {
              phone: "${this.loginForm.phone}"
            }){_id}}`;
          this.$gqlMutation(gql)
            .then(data => {
              const user = data.data.login;
              if (data.data.login._id) {
                this.$store.commit('setUserId', user._id);
                this.$router.push({ path: '/order' });
              }
            })

        }
      },
      employeeLogin() {
        if (!this.loginEmpForm.user) {
          this.$message.error("请输入用户名！");
        } else if (!this.loginEmpForm.code) {
          this.$message.error("请输入密码！");
        } else {
          const gql = `mutation { login(input: {
            name: "${this.loginEmpForm.user}"
            code: "${cryptoPasswd(this.loginEmpForm.code)}"
          }){_id}}`;
          this.$gqlMutation(gql)
            .then(data => {
              const user = data.data.login;
              if (data.data.login._id) {
                this.$store.commit('setUserId', user._id);
                this.$store.commit('setSsEmployee', !this.loginType);
                this.$router.push({ path: '/order' });
              }
            })
        }
      },
      submit() {
        if (this.loginType) {
          this.customerLogin();
        } else {
          this.employeeLogin();
        }
      }
    },
  }
</script>

<style lang="scss">
body {
  background-color: #ddd;
}
#login {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .login-card {
    width: 300px;
  }
}
</style>
