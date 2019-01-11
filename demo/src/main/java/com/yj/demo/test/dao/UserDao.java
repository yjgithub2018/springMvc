package com.yj.demo.test.dao;

import com.yj.demo.test.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * author zhangyj
 * date 2019/1/11 10:47
 * version 2.0
 */

@Repository
public class UserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public void add(User user) {
        String sql = "insert into test1(username,password) VALUES(?,?)";
        int count = jdbcTemplate.update(sql, user.getUsername(),
                user.getPassword());
    }

    public List queryList() {
        String sql = "SELECT * from test1";
       return jdbcTemplate.queryForList(sql);
    }
}
