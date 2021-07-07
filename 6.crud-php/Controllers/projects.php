<?php

require_once('controller.php');


class projects extends controller
{

    public $model_cls = "projects";
    public function __construct()
    {
        parent::__construct();
    }


    public function addProject()
    {
        $result= $this->model->addProject($this->getPostJsonData());
        $this->response = $result;
        return $this->response;
    }

    public function getAllProjects()
    {
        $data = $this->getPostJsonData();
        $result= $this->model->getAllProjects($data->account);
        $this->response = $result;
        return $this->response;
    }

}
