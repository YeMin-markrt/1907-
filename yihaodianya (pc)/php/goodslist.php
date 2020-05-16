<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";
if (mysqli_select_db($conn, "yihaodian")) {
    $result = mysqli_query($conn, "SELECT * FROM goodslist");
    $list = array();
    $data = array();
    while ($item = mysqli_fetch_array($result)) {
        $data["id"] = $item["id"];
        $data["goodsId"] = $item["goodsId"];
        $data["goodsName"] = $item["goodsName"];
        $data["goodsMsg"] = $item["goodsMsg"];
        $data["goodsPrice"] = $item["goodsPrice"];
        $data["goodsWeight"] = $item["goodsWeight"];
        $data["goodsImg"] = $item["goodsImg"];
        $data["goodsNum"] = $item["goodsNum"];
        $data["goodsImgList"] = explode(",", $item["goodsImgList"]);
        $list[] = $data;
    }
    echo json_encode($list);
} else {
    echo "数据库连接失败!!";
}
