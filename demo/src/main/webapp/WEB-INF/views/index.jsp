<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
String path = request.getContextPath();String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<html>
<head>

    <title>Index</title>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>statics/css/test.css"/> "/>
    <script type="text/javascript" src="<%=basePath%>/statics/js/jquery/jquery-1.8.2.min.js"></script>
    <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
</head>
<body>
<p>Spring MVC based on XML config success!</p>
<form id="form" action="<%=basePath%>/user/add" method="post">
    <div>用户名<input name="username"></div>
    <div>密码<input name="password"></div>
    <%--<div>年龄<input name="age"></div>--%>
    <%--<div>地址<input name="address"></div>--%>
    <%--<div>邮箱<input name="email"></div>--%>
    <div><input type="button" vlaue="添加" onclick="save()"></div>
</form>
<script type="text/javascript">
    function save() {
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
//            dataType: "json",//预期服务器返回的数据类型
            url: "<%=basePath%>/user/add" ,//url
            data: $('#form').serialize(),
            success: function (result) {
                alert(result);
                location.href="<%=basePath%>/user/list"
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.resultCode == 200) {
                    alert("SUCCESS");
                }
                ;
            },
//            error : function() {
//                alert("异常！");
//            }
        });
    }
</script>
</body>
</html>