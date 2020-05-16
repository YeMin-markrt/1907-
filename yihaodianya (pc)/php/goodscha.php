<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";

$key = $_GET["key"];
$orderCol = $_GET["orderCol"];
$orderType = $_GET["orderType"];
$pageIndex = $_GET["pageIndex"];
$showNum = $_GET["showNum"];

$skipNum = ($pageIndex - 1) * $showNum;

if (mysqli_select_db($conn, "yihaodian")) {
    $search = "select * from `goodslist` where goodsName like '%$key%' or goodsMsg like '%$key%' order by $orderCol $orderType";
    $search_result = mysqli_query($conn, $search);

    $sql = "select * from `goodslist` where goodsName like '%$key%' or goodsMsg like '%$key%' order by $orderCol $orderType limit $skipNum,$showNum";
    $result = mysqli_query($conn, $sql);

    $list = array();
    $data = array();
    $list1 = array();
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
        $list1[] = $data;
    }
    ;
    $list["goods"] = $list1;
    $list["count"] = $search_result->num_rows;
    echo json_encode($list);
} else {
    echo "数据库连接失败!";
}
