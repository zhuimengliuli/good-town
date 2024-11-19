# 数据库初始化


-- 创建库
create database if not exists good_town;

-- 切换库
use good_town;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment '账号',
    userPassword varchar(512)                           not null comment '密码',
    phone        varchar(256)                           null comment '电话',
    userName     varchar(256)                           null comment '用户姓名',
    userNickName      varchar(256)                       null comment '用户昵称',
    userIDCard        varchar(256)                    null comment '用户证件号码',
    userIDCardType    varchar(256)                    null comment '用户证件类型',
    userProfile  varchar(512)                           null comment '用户简介',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user/admin/ban',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
) comment '用户' collate = utf8mb4_unicode_ci;

-- 乡镇表
create table if not exists town
(
    id           bigint auto_increment comment 'id' primary key,
    townName     varchar(256)                           null comment '乡镇名',
    province     varchar(256)                           null comment '所属省份',
    city         varchar(256)                           null comment '所属地市',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
    ) comment '乡镇' collate = utf8mb4_unicode_ci;

-- 宣传表
create table if not exists promotion
(
    id           bigint auto_increment comment 'id' primary key,
    userId       bigint                                 not null    comment '用户id',
    townId       bigint                                 not null    comment '乡镇id',
    type         varchar(256)                           null comment '宣传类型',
    themeName    varchar(256)                           null comment '宣传主题名称',
    description  varchar(512)                          null comment '宣传描述',
    picture      varchar(512)                          null comment '图片',
    video        varchar(512)                          null comment '视频',
    state        varchar(512)                          null comment '状态：0：已发布 -1：已取消',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
    ) comment '宣传' collate = utf8mb4_unicode_ci;

-- 助力表
create table if not exists assistance
(
    id           bigint auto_increment comment 'id' primary key,
    promotionId  bigint                                 not null    comment '宣传id',
    userId       bigint                                 not null    comment '助力用户id',
    description  varchar(512)                          null comment '助力描述',
    picture      varchar(512)                          null comment '助力介绍图片',
    state        varchar(512)                          null comment '状态：0：待接收 1：同意 2：拒绝 3：取消',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
    ) comment '助力' collate = utf8mb4_unicode_ci;