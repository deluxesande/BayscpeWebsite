<?php
namespace Customers;
 
class Customer {

    /**
     * @author sirabdull70@gmail.com
     * @author <NAME> Highbee
     * @var int
     *  
     * please use the public values below as your form input names.
     *  
     * 
     *    */
    public $id;
    public $name;
    public $email;
    public $phone;
    public $address;
    public $city;
    public $state;
    public $country;
    public $customer_type;
    public $created_at;
    public $updated_at;
    public $customer_id;



/**
 * the constructor uses the session data to set the values of the properties.
 * the session email is passed to the constructor. when creating a new customer  object,
 * 
 * 
 */
  
    public function __construct($email) {
      
        $this->email = $email;
       
    }





/**
 * getDb()
 * THIS FUNCTION RETURNS A NEW INSTANCE OF A MYSQL DATABASE CONNECTION.
 * CALL THE FUNCTION FROM YOUR CONTROLLER AND USE IT TO ACCESS THE DATABASE.
 * 
 * 
 *
 * 
 */



public static function getDb() {
    $config = require __DIR__. '/../config/config.php';
    $db = $config['db'];
    return new mysqli($db['host'], $db['username'], $db['password'], $db['database']);
}


   /**
    *  CREATE CUSTOMER FOR BAYSCOPES 🙌🙌
    * THE CREATE FUNCTION IS USED TO CREATE A NEW CUSTOMER RECORD IN THE DATABASE.
    * CALL THE FUNCTION FROM YOUR CONTROLLER AND PASS IT AN ARRAY OF DATA.
    * USAGE: CALL THIS  MEHTOD USING  👉👉👉👉  $customer = Customer::create($data);  👈👈👈👈
    * THE FUNCTION WILL RETURN THE ID OF THE NEWLY CREATED RECORD.
    rules for data array: column form names must match the column names in the database, and the values must be in the correct data type.

    *
    */

    public static function create( array $data) {
    $db = static::getDb();

    $columns = array_keys($data);
    $values = array_values($data);
    $sql = 'INSERT INTO customers ('. implode(',', $columns). ') VALUES ('. str_repeat('?,', count($values) - 1). '?);';
    $stmt = $db->prepare($sql);
    $stmt -> bind_param('ssissss',...$values);
    $stmt->execute();
    return $db->lastInsertId();


    }
    /**
     * 
     * use this method to get all customer records from the database.
     * it returns an array of customer records.
     * 
     */

public static function getAll() {
    $db = static::getDb();
    $sql = 'SELECT * FROM customers';
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $customers = [];
    while($data = $result->fetch_assoc()) {
        $customers[] = $data;
    }
    return $customers;
}



    /**
     * 
     * use this method to get a customer record from the database.
     * 
     * 
     * */


   
    public function getData() {
        $db = static::getDb();
        $sql = 'SELECT * FROM customers WHERE email =?';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $this->email);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        $this->name = $data['name'];
        $this->id = $data['id'];
        $this->phone = $data['phone'];
        $this->address = $data['address'];
        $this->city = $data['city'];
        $this->state = $data['state'];
        $this->country = $data['country'];
        $this->customer_type = $data['customer_type'];
        $this->created_at = $data['created_at'];
        $this->updated_at = $data['updated_at'];
        $this->customer_id = $data['custumer_id'];
        return $data;
    }

    public function update(array $data) {
        $db = static::getDb();
        $columns = array_keys($data);
        $values = array_values($data);
        $sql = 'UPDATE customers SET '. implode(' =?, ', $columns).'=? WHERE id ='. $this->id . ';';
        $stmt = $db->prepare($sql);
        $stmt->bind_param(str_repeat('s', count($data) - 1).'s',...$values);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function delete() {
        $db = static::getDb();
        $sql = 'DELETE FROM customers WHERE id =?';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $this->id);
        $stmt->execute();
        return $stmt->affected_rows; 
    }

    



}







?>