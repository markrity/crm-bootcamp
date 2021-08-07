<?php

require_once('controller.php');


class stats extends controller
{

    public $model_cls = "stats";
    public function __construct()
    {
        parent::__construct();
        $inputJSON = file_get_contents('php://input');
        $this->input = json_decode($inputJSON, TRUE);
    }

    public function getMonthStats()
    {
        $this->month = $this->input['month'];
        $artistsStats = $this->model->getMonthArtistsStats($this->month);
        $hallStats = $this->model->getMonthHallStats($this->month);
        $this->response["artistsStats"] = $artistsStats;
        $this->response["hallStats"] = $hallStats;
        return $this->response;
    }
}
