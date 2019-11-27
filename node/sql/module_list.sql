/*!40101 SET NAMES utf8 */;

# 模块列表
CREATE TABLE   IF NOT EXISTS  `module_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT comment '模块id',
  `m_name` varchar(255) DEFAULT NULL comment '模块名称',   
  `git_address` varchar(255) DEFAULT NULL comment 'git仓库地址', 
  `server_address` varchar(255) DEFAULT NULL comment '服务器地址',  
  `server_user` varchar(255) DEFAULT NULL comment '服务器账户',   
  `server_password` varchar(255) DEFAULT NULL comment '服务器密码', 
  `directory` varchar(255) DEFAULT NULL comment '映射目录', 
  `u_id` int(11) DEFAULT NULL comment '管理员id', 
  `allot_u_id` int(11) DEFAULT NULL comment '分配人员id',  
  `allot_level` int(11) DEFAULT NULL comment '分配权限', # 1：直接上线 2：需审核后上线
  `create_time` varchar(20) DEFAULT NULL comment '创建时间', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
