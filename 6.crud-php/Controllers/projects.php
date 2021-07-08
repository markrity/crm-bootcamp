<?php

require_once('controller.php');


class projects extends controller
{

    public $model_cls = "projects";
    protected $user_id;
    protected $account_id;
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
        $params = $this->getPostJsonData();
        $data = [
            'account' => $this->account_id,
            'user' => $params->user ? $this->user_id : null
        ];
        $result= $this->model->getAllProjects($data);
        $this->response = $result;
        return $this->response;
    }

}
