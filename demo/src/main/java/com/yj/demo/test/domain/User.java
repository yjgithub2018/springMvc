package com.yj.demo.test.domain;

import java.io.Serializable;

/**
 * author zhangyj
 * date 2019/1/11 10:28
 * version 2.0
 */

    public class User implements Serializable {
        private static final long serialVersionUID = 1L;

    // id
    private Integer id;
    // 用户名
    private String username;
    // 密码
    private String password;
    // 年龄
    private Integer age;
    // 地址
    private String address;
    // 邮箱
    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
