<?php
@header("Content-Type:text/html;charset=utf-8");

require_once "conn.php";
$user = $_GET["user"];
$goodsId = $_GET["goodsId"];
$goodsNum = $_GET["goodsNum"];

$insert = "update `usergoods` set goodsNum ='$goodsNum' where username ='$user' and goodsId ='$goodsId' ";

mysqli_query($conn, $insert);
$row = mysqli_affected_rows($conn);

$msg = array();
if ($row > 0) {
    $msg["status"] = true;
    $msg["msg"] = "success!";
} else if ($row == 0) {
    $msg["status"] = true;
    $msg["msg"] = "success!";
} else {
    $msg["status"] = false;
    $msg["msg"] = "sql error!";
}

echo json_encode($msg);

mysqli_close($conn);
