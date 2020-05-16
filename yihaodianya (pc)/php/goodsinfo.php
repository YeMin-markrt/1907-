<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";

if (mysqli_select_db($conn, "yihaodian")) {
    $goodsId = $_GET["goodsId"];

    $sql = "select * from `goodslist` where goodsId ='$goodsId'";
    $result = mysqli_query($conn, $sql);
    $list = array();
    $item = mysqli_fetch_assoc($result);
    $data = array();
    if ($item) {
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
        echo json_encode($list);
    } else {
        echo "数据库正在更新中!";
    }
} else {
    echo "数据库连接失败!";
}
