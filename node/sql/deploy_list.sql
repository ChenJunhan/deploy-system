/*!40101 SET NAMES utf8 */;

# 部署列表
CREATE TABLE   IF NOT EXISTS  `deploy_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT comment 'id',
  `m_id` int(11) DEFAULT NULL comment '模块id',   
  `git_log_hash` varchar(255) DEFAULT NULL comment 'git commit hash', 
  `u_id` int(11) DEFAULT NULL comment '提交申请人员id', 
  `is_deploy` int(11) DEFAULT NULL comment '是否已经部署', # 0：未部署 1：已部署
  `create_time` varchar(20) DEFAULT NULL comment '提交时间', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
