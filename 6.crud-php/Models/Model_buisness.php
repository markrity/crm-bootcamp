<?php

require_once("Model.php");

class Model_buisness extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getHallsByBuisness($buisnessID)
    {
        $halls = $this->getDB()
            ->query("SELECT * FROM Halls WHERE buisnessID = $buisnessID")
            ->fetch_all(MYSQLI_ASSOC);
        return $halls;
    }
    public function getHallsInfo($buisnessID)
    {
        $halls = $this->getDB()
            ->query("SELECT Halls.id as hallID, Halls.name , Halls.capacity,
            Halls.price, 
            GROUP_CONCAT(CONCAT_WS(',', HallImages.name,HallImages.isMain,HallImages.id ) SEPARATOR ';' ) as urls
            FROM Halls
            LEFT JOIN HallImages ON Halls.id = HallImages.HallID
            WHERE Halls.BuisnessID = '$buisnessID'
            GROUP BY Halls.id
            ")
            ->fetch_all(MYSQLI_ASSOC);

        foreach ($halls as &$obj) {
            $obj["urls"] = (explode(';', $obj["urls"]));
            $temp = [];
            foreach ($obj["urls"] as $arr) {
                if ($arr) {
                    $tmp_arr = explode(',', $arr);
                    array_push($temp, (object)array("url" => $tmp_arr[0], "isMain" => $tmp_arr[1], "imgID" => $tmp_arr[2]));
                }
            }
            $obj["urls"] = $temp;
        }
        return $halls;
    }

    public function addHall($buisnessID, $form)
    {
        $name = $form["name"];
        $price = (int)$form["price"];
        $capacity = (int)$form["capacity"];
        $this->getDB()
            ->query("INSERT INTO Halls(Name, Capacity, BuisnessID, Price)
    VALUES ('$name', '$capacity', '$buisnessID', '$price')");
        return $this->getHallsInfo($buisnessID);
    }

    public function editHallInfo($hallID, $form, $buisnessID)
    {
        $name = $form["name"];
        $price = $form["price"];
        $capacity = $form["capacity"];
        $this->getDB()
            ->query("UPDATE Halls
        SET Name = '$name',
        Capacity = '$capacity',
        Price = '$price'
        WHERE id = $hallID");
        return $this->getHallsInfo($buisnessID);
    }

    public function removeHallImage($imgID, $buisnessID)
    {
        $this->getDB()->query("DELETE FROM HallImages WHERE id = '$imgID'");
        return $this->getHallsInfo($buisnessID);
    }

    public function attachImgToHall($fileName, $hallID, $buisnessID, $isMain)
    {
        $this->getDB()
            ->query("INSERT INTO HallImages(name, BuisnessID, HallID, isMain)
        VALUES ('$fileName', '$buisnessID', '$hallID', '$isMain')");
        return $this->getHallsInfo($buisnessID);
    }

    public function changeMainImg($imgID, $hallID, $buisnessID)
    {
        $this->getDB()
            ->query("UPDATE HallImages
            SET isMain = (case when id = '${imgID}' then '1'
                                 when id != '${imgID}' then '0'
                            end)
            WHERE HallID = '$hallID'");
        return $this->getHallsInfo(($buisnessID));
    }

    public function getImg($file)
    {
        if (file_exists($file)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($file) . '"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            readfile($file);
            exit;
        }
    }

    public function removeHall($hallID, $buisnessID)
    {
        $this->getDB()
            ->query("DELETE FROM Halls WHERE id='$hallID'");
        return $this->getHallsInfo(($buisnessID));
    }
}
