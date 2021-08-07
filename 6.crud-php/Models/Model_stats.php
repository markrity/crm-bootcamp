
<?php

require_once("Model.php");

class Model_stats extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMonthArtistsStats($month)
    {
        $artists = $this->getDB()
            ->query("SELECT sum(if(MONTH(Events.date) = '$month', 1, 0)) as numberOfPerformences,
            DJBand.name as artist FROM EventDetails
            RIGHT JOIN Events 
            ON EventDetails.eventID = Events.id
            RIGHT JOIN DJBand
            ON EventDetails.artistID = DJBand.id
            Group By DJBand.id
            ORDER BY numberOfPerformences DESC")
            ->fetch_all(MYSQLI_ASSOC);
        $names = [];
        $numberOfPerformences = [];
        foreach ($artists as &$obj) {
            array_push($names, $obj["artist"]);
            array_push($numberOfPerformences, $obj["numberOfPerformences"]);
        }
        return (object)array("names" => $names, "numberOfPerformences" => $numberOfPerformences);
    }

    public function getMonthHallStats($month)
    {
        $hallNames = $this->getDB()
            ->query("SELECT name FROM Halls")->fetch_all(MYSQLI_ASSOC);

        $halls = $this->getDB()
            ->query("SELECT  concat(Year(countTable.date),'-',Month(countTable.date)) as date,
            GROUP_CONCAT(CONCAT_WS(',', name,countTable.numberOfEvents) SEPARATOR ';' ) as halls
            FROM 
            (SELECT count(*) as numberOfEvents,
            Date(date) as date,
            name
            FROM Events
            JOIN Halls
            ON Events.hallID = Halls.id
            Group By name,Month(date),Year(date)) 
            countTable
            GROUP BY countTable.date
            ORDER BY countTable.date           
            ")
            ->fetch_all(MYSQLI_ASSOC);

        foreach ($hallNames as &$date) {
            $date["data"] = array_fill(0, count($halls), 0);
            $date["type"] = 'area';
        }
        $labels = [];
        $index = 0;
        foreach ($halls as &$date) {
            $curDate = (explode('-', $date["date"]));
            $date["date"] = $curDate[0] . " " . substr((date("F", mktime(0, 0, 0, intval($curDate[1]), 10))), 0, 3);
            $date["halls"] = (explode(';', $date["halls"]));
            array_push($labels, $date["date"]);
            $temp = [];
            foreach ($date["halls"] as $arr) {
                if ($arr) {
                    $tmp_arr = explode(',', $arr);
                    foreach ($hallNames as &$hall) {
                        if ($hall["name"] === $tmp_arr[0]) {
                            $hall["data"][$index] = intval($tmp_arr[1], 10);
                        }
                    }
                    array_push($temp, (object)array("name" => $tmp_arr[0], "numberOfEvents" => $tmp_arr[1]));
                }
            }
            $date["halls"] = $temp;
            $index = $index + 1;
        }
        $hallStats = (object)array("series" => $hallNames, "labels" => $labels);

        return $hallStats;
    }

    public function getMonthFoodStats($month)
    {
    }
}
