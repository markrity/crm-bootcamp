<?php

require_once("Model.php");

class Model_clients extends Model
{
    public $table = "clients";
    public $account_id = 1;
    
    public function __construct()
    {
        parent::__construct();
    }

    public function addClient($name, $mail, $phone)
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
                "'$this->account_id'",
                "'$mail'",
                "'$phone'"
            ],
        ];
        return $this->insertItem($queryData);
    }

    public function getAllClients($input)
    {   
        if(empty($input)){
            $queryData = [
                "where" => [
                    "account_id" => $this->account_id,
                ]
            ];
        } else {
            $queryData = [
                "specialCondition" => "account_id=$this->account_id AND client_name like '$input%'"
            ];
        }
        return $this->getAll($queryData, true); 
    }
}
