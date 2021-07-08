<?php

require_once("Model.php");
require_once("Model_clients.php");
class Model_projects extends Model
{
    public $table = "projects";
    public $clientModel;
    public $account_id;

    public function __construct()
    {
        parent::__construct();
        $this->clientModel = new Model_clients();
        $this->clientModel->account_id = $this->account_id;
    }

    public function addProject($projectDetails)
    {
        $this->clientModel->account_id = $this->account_id;
        $clientDetails = $projectDetails->client;
        $clientId = intval($clientDetails->clientId ?? -1);
        if($clientId <= 0){
           $clientId = $this->clientModel->addClient($clientDetails->name, $clientDetails->mail, $clientDetails->phone);
        } 

        $queryData = [
            "cols" => [
                'client_id', 
                'account_id',  
                'item_type', 
                'description',
                'deadline',
                'project_status'
            ],
            "values" => [
                "'$clientId'",
                "'$this->account_id'",
                "'$projectDetails->type'",
                "'$projectDetails->description'",
                "'$projectDetails->deadline'",
                "'$projectDetails->status'",
            ],
        ];
        return $this->insertItem($queryData);
    }

    public function getAllProjects($data)
    {   
        $queryData = [
            "cols" => [
                'projects.*',
                'clients.client_name'
            ],
            "where" => [
                "projects.account_id" => $this->account_id,
            ],
            "join" => 'INNER JOIN clients ON clients.client_id=projects.client_id'
        ];
        if(!empty($data['user'])){
            $queryData["where"]["assigned_user_id"] = $data['user'];
        }
        return $this->getAll($queryData); 
    }
}
