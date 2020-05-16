<?php

@header("Content-Type:text/html;charset=utf-8");

require_once "conn.php";

$user = $_GET["user"];
$id = $_GET["id"]; //1,2,3,4

$del = "delete from `usergoods` where username ='$user' and id in ($id)";

mysqli_query($conn, $del);

$row = mysqli_affected_rows($conn);

$msg = array();
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

echo json_encode($msg);
