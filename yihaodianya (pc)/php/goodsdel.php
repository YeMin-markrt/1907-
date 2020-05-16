<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";
$user = $_GET["user"];
$goodsId = $_GET["goodsId"];
if (mysqli_select_db($conn, "yihaodian")) {
    $del = "delete from `usergoods` where username ='$user' and goodsId = '$goodsId'";
    mysqli_query($conn, $del);
    $row = mysqli_affected_rows($conn);
    $msg = array();
    if ($row > 0) {
        $msg["status"] = true;
        $msg["msg"] = "删除成功";
    } else if ($row == 0) {
        $msg["status"] = false;
        $msg["msg"] = "删除失败,该数据不存在";
    } else {
        $msg["status"] = false;
        $msg["msg"] = "sql 语句错误";
    }
    echo json_encode($msg);
} else {
    echo "数据库连接失败!!";
}
