/*!40101 SET NAMES utf8 */;

# 模块列表
CREATE TABLE   IF NOT EXISTS  `module_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 用户ID
  `m_name` varchar(255) DEFAULT NULL,     # 模块名称
  `git_address` varchar(255) DEFAULT NULL,     # git仓库地址
  `server_address` varchar(255) DEFAULT NULL,  # 服务器地址
  `server_user` varchar(255) DEFAULT NULL,   # 服务器账户
  `server_password` varchar(255) DEFAULT NULL, # 服务器密码
  `directory` varchar(255) DEFAULT NULL, # 映射目录
  `u_id` int(11) DEFAULT NULL, # 分配人员id
  `allot_level` int(11) DEFAULT NULL, # 分配权限
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
