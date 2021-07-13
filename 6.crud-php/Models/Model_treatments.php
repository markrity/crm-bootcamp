<?php 
    require_once("Model_crud.php");

    class Model_treatments extends Model_crud
    {
       
        public function __construct()
        {
            parent::__construct();
            $this->table_name= "treatments";

        }


        public function getTreatmentData($account_id) {

            $newSql = "SELECT treatments.*, clients.fullname, users.user_fullname
            FROM clients
            INNER JOIN treatments 
            INNER JOIN users 
            ON (clients.id = treatments.client_id) and (clients.account_id = $account_id) and (users.user_id = treatments.user_id)";

            
            // $sql = "SELECT * FROM $this->table_name WHERE (account_id=$account_id) AND (fullname='$fullname')";
           // var_dump($sql);
            $res = $this->getDB()->query($newSql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }
        
    }

?>