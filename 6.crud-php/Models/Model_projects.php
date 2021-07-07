<?php

require_once("Model.php");

class Model_projects extends Model
{
    public $table = "projects";
    public function __construct()
    {
        parent::__construct();
    }

    public function addClient($name, $account, $mail, $phone)
    {
        $queryData = [
            "cols" => [
                'client_name', 
                'account_id',  
                'client_mail', 
                'client_phone'
            ],
            "values" => [
                "'$name'",
                "'$account'",
                "'$mail'",
                "'$phone'"
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
