<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";
require_once "common.php";
$tel = $_GET["tel"];
$msg = array();

if (!isExistPhone($tel)) {
    $msg["status"] = true;
    $msg["msg"] = "手机号可用";
} else {
    $msg["status"] = false;
    $msg["msg"] = "手机号已存在";
}

echo json_encode($msg);
