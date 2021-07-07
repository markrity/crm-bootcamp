<?php

require_once("Model.php");
require_once("Model_clients.php");
class Model_projects extends Model
{
    public $table = "projects";
    public $clientModel;
    public function __construct()
    {
        parent::__construct();
        $this->clientModel = new Model_clients();
    }

    public function addProject($projectDetails)
    {

        $clientDetails = $projectDetails->client;
        if(empty($clientDetails->clientId)){
           $clientId = $this->clientModel->addClient($clientDetails->name, $projectDetails->accountId, $clientDetails->mail, $clientDetails->phone);
        } else {
            $clientId = $clientDetails->clientId;
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
                "'$projectDetails->accountId'",
                "'$projectDetails->type'",
                "'$projectDetails->description'",
                "'$projectDetails->deadline'",
                "'$projectDetails->status'",
            ],
        ];
        return $this->insertItem($queryData);
    }

    public function getAllProjects($account)
    {   
        $queryData = [
            "where" => [
                "account_id" => $account,
            ]
        ];
        return $this->getAll($queryData, true); 
    }
}
