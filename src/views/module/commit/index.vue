<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="模块名称">
        <!-- <el-input v-model="form.name" /> -->
        后端B
      </el-form-item>
      <el-form-item label="git分支">
        <el-select v-model="form.region" placeholder="选择分支">
          <el-option label="master" value="1" />
          <el-option label="test" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="提交记录">
        <el-select v-model="form.region" placeholder="选择">
          <el-option label="fdsafs4564" value="1" />
          <el-option label="dfasf1234" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="部署说明">
        <el-input v-model="form.desc" type="text" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
  },
  created: function() {
    console.log(this.$route.params.moduleId)
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
