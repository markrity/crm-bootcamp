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
            $res = $this->getDB()->query($newSql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }


        public function getTreatmentDataOfClient($account_id, $client_id) {
            $newSql = "SELECT treatments.*, clients.fullname, users.user_fullname
            FROM clients
            INNER JOIN treatments 
            INNER JOIN users 
            ON (clients.id = treatments.client_id) and (clients.account_id = $account_id) and (users.user_id = treatments.user_id) and (clients.id = $client_id)";
            $res = $this->getDB()->query($newSql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }



        public function getAvailableUsersByDate($account_id, $date) {
            $newSql = "	SELECT users.user_fullname, users.user_id
            from  users 
            inner join  treatments
            on '$date' BETWEEN treatments.date_time AND DATE_ADD(treatments.date_time, INTERVAL 3599 second)
            and treatments.account_id = $account_id
            and users.user_id = treatments.user_id";
            $res = $this->getDB()->query($newSql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }


        public function getTreatmentFilter($account_id, $start_date, $end_date) {
            $newSql = "	  SELECT treatments.*, clients.fullname, users.user_fullname
            FROM clients
            INNER JOIN treatments 
            INNER JOIN users 
            ON (clients.id = treatments.client_id) and (clients.account_id = $account_id) and (users.user_id = treatments.user_id)
			and treatments.date_time BETWEEN '$start_date' AND ' $end_date'";
            $res = $this->getDB()->query($newSql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }
        
        public function getTreatmentByMonth($account_id) {
            $newSql = "SELECT month(treatments.date_time) as the_month, count(treatments.id) as count1, sum(treatments.price) as sum1
            from treatments
            inner join clients
            on clients.id = treatments.client_id
            and treatments.account_id = $account_id
            group by the_month";
            
            $res = $this->getDB()->query($newSql)->fetch_all(MYSQLI_ASSOC);
          
            return $res;
        }

        public function getTreatmentByKind($account_id) {
            $newSql = "SELECT treatments.kind as kind, count(treatments.id) as count1
            from treatments
            inner join clients
            on clients.id = treatments.client_id
            and treatments.account_id = 10
            group by treatments.kind";
            
            $res = $this->getDB()->query($newSql)->fetch_all(MYSQLI_ASSOC);
          
            return $res;
        }
      
    }

?>