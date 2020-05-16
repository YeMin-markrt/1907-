<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";
require_once "common.php";
$user = $_GET["user"];
$msg = array();

if (!isExistUser($user)) {
    $msg["status"] = true;
    $msg["msg"] = "用户可用";
} else {
    $msg["status"] = false;
    $msg["msg"] = "用户已存在";
}

echo json_encode($msg);
