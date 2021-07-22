<?php 

 
    require_once("controller.php");

    class treatments extends controller
    {
       
        public $model_class = "treatments";
        public function __construct()
        {
           parent::__construct();
           $this->field_array =["client_id", "date_time", "kind", "price", "created_at", "account_id", "user_id"];
        }


        public function getTreatmentTable() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getTreatmentData($data->account_id);
            $this->response["clients"] = $treatments;
            return $this->response;
        }


        public function getTreatmentTableOfClient() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getTreatmentDataOfClient($data->account_id, $data->client_id);
            $this->response["treatments"] = $treatments;
            return $this->response;
        }

        public function getAvailableUsers() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getAvailableUsersByDate($data->account_id, $data->date);
            $this->response["clients"] = $treatments;
            return $this->response;
        }

        public function getTreFilter() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getTreatmentFilter($data->account_id, $data->start_date, $data->end_date);
            $this->response["treatment"] = $treatments;
            return $this->response;
        }

        

        public function getTreByMonth() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getTreatmentByMonth($data->account_id);
            $this->response["treatment"] = $treatments;
            return $this->response;
        }


        public function getTreatmentByKind() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getTreatmentByKind($data->account_id);
            $this->response["treatment"] = $treatments;
            return $this->response;
        }

    }

?>