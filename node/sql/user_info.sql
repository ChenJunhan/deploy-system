/*!40101 SET NAMES utf8 */;

# 用户信息表
CREATE TABLE   IF NOT EXISTS  `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT comment '用户id', 
  `password` varchar(255) DEFAULT NULL comment '密码', 
  `name` varchar(255) DEFAULT NULL comment '用户名',   
  `nick` varchar(255) DEFAULT NULL comment '用户昵称',  
  `detail_info` longtext DEFAULT NULL comment '详细信息', 
  `create_time` varchar(20) DEFAULT NULL comment '创建时间',  
  `modified_time` varchar(20) DEFAULT NULL comment '修改时间',
  `level` int(11) DEFAULT NULL comment '权限级别', # 1： 管理者 2：开发者 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 插入默认信息
INSERT INTO `user_info` set name='chenjunhan', password='123456', level=1;