package com.yj.demo.test.service.impl;

import com.yj.demo.test.dao.UserDao;
import com.yj.demo.test.domain.User;
import com.yj.demo.test.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * author zhangyj
 * date 2019/1/11 10:33
 * version 2.0
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;
//    @Autowired
//    JdbcTemplate jdbcTemplate ;
    public void add(User user) {
//        jdbcTemplate.execute("insert test1 VALUES (1,2,3)");
        userDao.add(user);
    }

    public List queryList() {
        return userDao.queryList();
    }
}
