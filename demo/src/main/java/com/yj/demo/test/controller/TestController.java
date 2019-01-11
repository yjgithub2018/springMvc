package com.yj.demo.test.controller;

import com.yj.demo.test.domain.User;
import com.yj.demo.test.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * author zhangyj
 * date 2019/1/10 16:26
 * version 2.0
 */
@Controller
@RequestMapping("/user")
public class TestController {
    @Autowired
    UserService userService;
    @RequestMapping("/userList")
    public String index() {
        return "userList";
    }
    @RequestMapping("/add")
    @ResponseBody
    public String  add(User user){
//        user.setUsername("张三");
//        user.setPassword("123456");
        userService.add(user);
        return "success";
    }

    @RequestMapping("/list")
    public String add(Model model){
//        user.setUsername("张三");
//        user.setPassword("123456");
      List list=  userService.queryList();
        model.addAttribute("list",list);
        return "userList";
    }
}
