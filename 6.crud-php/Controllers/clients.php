<?php 

 
    require_once("controller.php");

    class clients extends controller
    {
       
         public $model_class = "clients";
        // public $field_array =["fullname", "phone", "email", "account_id"];
        
        public function __construct()
        {
           parent::__construct();
           //$this->model_class = "clients";
           $this->field_array =["fullname", "phone", "email", "account_id"];



        }

        public function savePic() 
        {
            move_uploaded_file($_FILES["image"]["tmp_name"], "img/" . $_FILES["image"]["name"]);
            return "save";
        }

        public function getBigClient() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $clients = $this->model->getBigClients($data->account_id);
            $this->response["clients"] = $clients;
            return $this->response;
        }



        public function get() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $clients = $this->model->getClientByName($data->account_id,$data->fullname);
            $this->response["clients"] = $clients;
            return $this->response;
        }

        public function getClientNameByID() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
          
            $clients = $this->model->getClientDetails($data->account_id,$data->client_id);
           
            $this->response["clients"] = $clients;
          //  var_dump($clients);
            return $this->response;
        }
        public function getPicName() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
          
            $clients = $this->model->getPic($data->account_id,$data->client_id);
           
            $this->response["pic"] = $clients;
          //  var_dump($clients);
            return $this->response;
        }
       
        
    }

?>