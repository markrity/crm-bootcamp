<?php

require_once('controller.php');


class buisness extends controller
{

    public $model_cls = "buisness";
    public $buisnessID;

    public function __construct()
    {
        parent::__construct();
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $this->buisnessID = $input['buisnessID'];
    }

    public function getHalls()
    {
        $halls = $this->model->getHallsByBuisness($this->buisnessID);
        $this->response["halls"] = $halls;
        return $this->response;
    }

    public function hallsInfo()
    {
        $hallsInfo = $this->model->getHallsInfo($this->buisnessID);
        $this->response["hallsInfo"] = $hallsInfo;
        return $this->response;
    }
}
