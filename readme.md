## About

Simple website to get votes from customers


Features:
 - First three questions are static, fourth one can be changed from admin panel
 - Set target values to see if you met your target
 - export data to a XML file
 
Requires:
 - PHP 5.x.x
 - MySQL

External dependencies (included in this repo):
 - jquery
 - jquery ui
 - Chart.js
 - moment.js
 - php-export-data by Eli Dickinson, http://github.com/elidickinson/php-export-data

Setup:
 - check and edit `db/config_EXAMPLE.php` and save as `config.php`
 - create new database with the same name as set in `$db_name` in `config.php`
 - load `db/default_db.sql` into the newly created database (or `default_db_with_example_data.sql` to have some data upfront to see how the program behaves)
 
Preview:

![Alt text](/example_pic/preview-1.png?raw=true "Admin panel")

![Alt text](/example_pic/preview-2.png?raw=true "Vote index page")

![Alt text](/example_pic/preview-3.png?raw=true "Vote visible for user")
