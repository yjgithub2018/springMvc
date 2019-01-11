package com.yj.demo.test.controller;

/**
 * author zhangyj
 * date 2019/1/11 9:13
 * version 2.0
 */

public class Test {
    public static void main(String [] args){
        String s1="ab";
        String s2= new String("ab");
        String s3="a";
        String s4="b";
        String s5="a"+"b";
        String s6=s3+s4;
        System.out.println(s1==s2);
        System.out.println(s1==s5);
        System.out.println(s1==s6);
        System.out.println(s1==s6.intern());
        System.out.println(s2==s2.intern());
    }
}
