import Loading from '../../components/Loading'
export default {
  name: 'Login',
  components: { Loading },
  data: () => {
    return {
      d_loginForm: {
        user: '',
        password: '',
      },
      d_loginError: {
        user_error: '',
        password_error: ''
      },
    }
  },
  validations: {},
  methods: {
    loginClick () {
      if (this.d_loginForm.user && this.d_loginForm.password) {
        this.post(`/dataview/login`,this.d_loginForm)
          .then((res) => {
            this.$localStorage.set('userRole', res.data.userType)
            this.$localStorage.set('APPKEY', res.data.APPKEY)
            this.$localStorage.set('userType', res.data.APPKEY)
            if (res.data.userType === 'merchant') {
              this.$router.push('/mchart')
            } else {
              this.$router.push('/schart')
            }
          })
          .catch((err) => {})
        return true
      }
    },
    loginSwitchChange () {
      console.log('222');
    },
  },
  created () {
    this.$localStorage.remove('userCode')
    this.$localStorage.remove('merchatCode')
    this.$localStorage.remove('routers')
  }
}
