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
    }
}
