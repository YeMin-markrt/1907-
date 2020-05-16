<?php
header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";

$count = $_GET["count"];
$pwd = $_GET["pwd"];

if (mysqli_select_db($conn, "yihaodian")) {
    $search = "SELECT * FROM `usreinfo` where user='$count' or tel='$count' ";
    $result = mysqli_query($conn, $search);
    $item = mysqli_fetch_array($result);
    $msg = array();
    if ($item) {
        $repwd = $item["pwd"];
        if ($pwd == $repwd) {
            $msg["status"] = true;
            $msg["msg"] = "登录成功";
            $msg["user"] = $item["user"];
            $msg["userId"] = $item["id"];
        } else {
            $msg["status"] = false;
            $msg["msg"] = "密码错误";
        }
    } else {
        $msg["status"] = false;
        $msg["msg"] = "该用户不存在";
    }
    echo json_encode($msg);
} else {
    echo "数据库连接失败!!";
}
