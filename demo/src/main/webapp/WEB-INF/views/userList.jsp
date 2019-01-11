<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>数据查询列表</title>
</head>
<body>
<form action="" method="post">
    数据查询：
    <table width="10%" border=1>
        <tr>
            <td><input type="text" name="num" placeholder="编号"/><br/></td>
            <td><input type="submit" value="查询"/></td>
            <%--<td><input type="button" value="新增"/></td>--%>
        </tr>
    </table>
    数据列表：
    <table width="100%" border=1>
        <tr>
            <td>编号</td>
            <td>用户名</td>
            <td>操作</td>
        </tr>
        <c:forEach items="${list }" var="data">
            <tr>
                <td>${data.id }</td>
                <td>${data.username}</td>

                <td><a href="">修改</a></td>

            </tr>
        </c:forEach>

    </table>
</form>
</body>

</html>

