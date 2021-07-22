<?php 
    require_once("Model_crud.php");
    class Model_kinds extends Model_crud
    {
       // private $table_name = "clients";
        public function __construct()
        {
            parent::__construct();
            $this->table_name= "kinds";
          
        }
        
        public function getGraph1($account_id) {
            $sql = "SELECT table_a.user_name, type_name, type_count/total_types*100 as perc from (select users.account_id, users.user_fullname as user_name, kinds.name as type_name , count(kinds.name) as type_count
            from users
            inner join kinds
            inner join treatments
            inner join clients
            on kinds.name = treatments.kind
            and treatments.account_id = $account_id
            and users.account_id = treatments.account_id
            and treatments.user_id = users.user_id
            and clients.id = treatments.client_id
            group by user_name , type_name ) table_a 
            join 
            (select users.user_fullname as user_name, count(kind) as total_types
             from treatments  
             inner join clients
             inner join users
             on clients.id = treatments.client_id
             and users.user_id = treatments.user_id
            group by user_name)  table_b
            on table_a.user_name = table_b.user_name";
            
             $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
             return $res;
        }
    }

?>