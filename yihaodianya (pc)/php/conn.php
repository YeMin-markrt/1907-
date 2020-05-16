<?php
@header("Content-Type:text/html;charset=utf-8");
@header("Access-Control-Allow-origin:*");
@header('Access-Control-Allow-Headers:x-requested-with,content-type');
$conn = mysqli_connect("127.0.0.1", "root", "root");
mysqli_select_db($conn, "yihaodian");

mysqli_query($conn, "set names utf8");
mysqli_query($conn, "set character set utf-8");
