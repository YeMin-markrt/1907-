<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";

$user = $_GET["user"];
$goodsId = $_GET["goodsId"];
$buy_num = $_GET["buy_num"];

$search = "select * from `usergoods` where username='$user' and goodsId = '$goodsId'";

$result = mysqli_query($conn, $search);

if ($result->num_rows > 0) {
    $update = "update `usergoods` set goodsNum =  goodsNum  + $buy_num  where username ='$user' and goodsId ='$goodsId'";
    mysqli_query($conn, $update);
} else {
    $insert = "insert into `usergoods`(username,goodsId,goodsNum) value('$user','$goodsId',$buy_num)";
    mysqli_query($conn, $insert);
}

$row = mysqli_affected_rows($conn);

$msg = array();
if ($row > 0) {
    $msg["status"] = true;
    $msg["msg"] = "新增成功!";
} else if ($row == 0) {
    $msg["status"] = false;
    $msg["msg"] = "新增失败!";
} else {
    $msg["status"] = false;
    $msg["msg"] = "sql error!";
}

echo json_encode($msg);
