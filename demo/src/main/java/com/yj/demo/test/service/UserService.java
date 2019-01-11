package com.yj.demo.test.service;

import com.yj.demo.test.domain.User;

import java.util.List;

/**
 * author zhangyj
 * date 2019/1/11 10:32
 * version 2.0
 */

public interface UserService {
    public void add(User user);

    List queryList();
}
