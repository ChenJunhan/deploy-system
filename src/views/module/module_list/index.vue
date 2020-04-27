<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(module, index) in moduleList" :key="index">
        <router-link :to="`/moduleCommit/${module.m_id}?${module.m_name}`">
          <div class="card">
            <p class="module-name">{{ module.m_name }}</p>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getModulesList } from '@/api/module'

export default {
  data() {
    return {
      moduleList: []
    }
  },
  methods: {
    
  },
  created: function() {
    getModulesList().then(d => {
      if (!d.code) {
        this.moduleList = d.data
      }
    })
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.card {
  background: #E7FAF0;
  border: 1px solid #D0F5E0;
  border-radius: 10px; 
  cursor: pointer;
  box-shadow: 0 2px 12px 0 transparent;
  margin-bottom: 20px;
}
.card:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.module-name {
  text-align: center;
  padding: 30px;
  color: #13CE66;
  font-size: 26px;
}
</style>

