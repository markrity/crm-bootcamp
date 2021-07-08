<?php

require_once('controller.php');


class clients extends controller
{

    public $model_cls = "clients";
    public function __construct()
    {
        parent::__construct();
    }


    public function addClient()
    {
        $data = $this->getPostJsonData();
        $this->response = $this->model->addClient($data->name, $this->account_id , $data->mail, $data->phone);
        return $this->response;
    }

    public function getAllClients()
    {
        $result= $this->model->getAllClients($this->account_id);
        $this->response = $result;
        return $this->response;
    }

}
