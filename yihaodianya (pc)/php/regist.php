<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";
require_once "common.php";

if (mysqli_select_db($conn, "yihaodian")) {
    $user = $_GET["user"];
    $pwd = $_GET["pwd"];
    $tel = $_GET['tel'];
    $msg = array();
    // echo $use;
    // echo $pwd;
    if (isExistUser($user)) {
        $msg["status"] = false;
        $msg["msg"] = "用户名已存在!";
    } else if (isExistPhone($tel)) {
        $msg["status"] = false;
        $msg["msg"] = "手机号已存在!";
    } else {
        $insert = "INSERT INTO `usreinfo`(user,pwd,tel) VALUES('$user','$pwd','$tel')";
        mysqli_query($conn, $insert);
        $row = mysqli_affected_rows($conn);
        if ($row > 0) {
            $msg["status"] = true;
            $msg["msg"] = "success!";
        } else if ($row == 0) {
            $msg["status"] = false;
            $msg["msg"] = "fail!";
        } else {
            $msg["status"] = false;
            $msg["msg"] = "sql error!";
        }
    }
    echo json_encode($msg);
} else {
    echo "数据库连接失败!!";
}
