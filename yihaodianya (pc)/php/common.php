<?php

//用户名是否存在
function isExistUser($user)
{
    global $conn;
    $search = "SELECT * FROM `usreinfo` where user='$user'";
    $result = mysqli_query($conn, $search);
    $item = mysqli_fetch_array($result);
    if ($item) {
        return true;
    } else {
        return false;
    }

}

//手机号是否存在
function isExistPhone($tel)
{
    global $conn;
    $search = "SELECT * FROM `usreinfo` where tel='$tel'";
    $result = mysqli_query($conn, $search);
    $item = mysqli_fetch_array($result);
    if ($item) {
        return true;
    } else {
        return false;
    }

}
