<?php 

 
    require_once("controller.php");

    class kinds extends controller
    {
       
         public $model_class = "kinds";
        // public $field_array =["fullname", "phone", "email", "account_id"];
        
        public function __construct()
        {
           parent::__construct();
           //$this->model_class = "clients";
           $this->field_array =["name", "account_id"];

        }

        public function getGraph1Data() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $res = $this->model->getGraph1($data->account_id);
            $this->response["type_data"] = $res;
            return $this->response;
        }


   
        
    }

?>