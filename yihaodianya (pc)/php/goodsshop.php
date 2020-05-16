<?php
@header("Content-Type:text/html;charset=utf-8");
require_once "conn.php";

$user = $_GET["user"];

if (mysqli_select_db($conn, "yihaodian")) {
    $serach = "select s.id,s.username,s.goodsId,s.goodsNum,g.goodsName,g.goodsName,g.goodsMsg,g.goodsWeight,g.goodsPrice,g.goodsImg,g.goodsImgList from `usergoods` as s,`goodslist` as g where s.username = '$user' and s.goodsId = g.goodsId;";
    $result = mysqli_query($conn, $serach);
    $list = array();
    while ($item = mysqli_fetch_array($result)) {
        $data = array();
        $data["id"] = $item["id"];
        $data["username"] = $item["username"];
        $data["goodsId"] = $item["goodsId"];
        $data["goodsNum"] = $item["goodsNum"];
        $data["goodsName"] = $item["goodsName"];
        $data["goodsMsg"] = $item["goodsMsg"];
        $data["goodsPrice"] = $item["goodsPrice"];
        $data["goodsImg"] = $item["goodsImg"];
        $data["goodsWeight"] = $item["goodsWeight"];
        $data["goodsImgList "] = explode(",", $item["goodsImgList"]);
        $list[] = $data;
    }
    echo json_encode($list);
} else {
    echo "数据库连接失败!";
}
