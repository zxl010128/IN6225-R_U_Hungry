# IN6225-R_U_Hungry

## How to start the project

Please make sure that IntelliJ, Java, Node.js, MySQL, and MySQL Workbench are installed properly on your computer. You can find these software packages on their respective official websites. After that, please properly download my code zip.

### MySQL database
- Open MySQL Workbench and connect to your MySQL server.
- Click on "File" in the top-left corner and select "Open SQL Script".
- Navigate to the location where you have saved the RUHungry.sql file and select it.
- Click on the "Open" button to open the file in MySQL Workbench.
- Review the SQL commands in the file and ensure that they align with your intended database schema.
- Once you are satisfied, click on the "Execute" button to run the SQL commands and create the database schema.

### Redis
To download and run Redis, please follow these steps:
- Go to the official Redis website at https://redis.io/
- Select the appropriate version of Redis for your operating system and click the corresponding download link.
- Once the download is complete, extract the files from the downloaded archive.
- Open a terminal or command prompt and navigate to the directory where Redis was extracted.
- Run the Redis server by executing the "redis-server" command.

### Backend
- Open the IntelliJ and import the backend code. Since it is a maven file, it will automatically download all the required dependencies. After that, Please modify the port number and database config in application.yml file.

~~~ yml
server:
 port: 8080
spring:
 datasource:
   druid:
     driver-class-name: com.mysql.cj.jdbc.Driver
     url: jdbc:mysql://localhost:3306/RUHungry?useSSL=false&serverTimezone=UTC
     username: root
     password: zxl010128
~~~

- Please change the redis config in the CartController.class and RedisUtils.class.

~~~ Java
private static final String REDIS_HOST = "localhost";
private static final int REDIS_PORT = 6379;
~~~

- Please change the origin info status in the WebMvcConfig.class

~~~ Jave
public void addCorsMappings(CorsRegistry registry) {
   registry.addMapping("/**")
           .allowedOrigins("http://localhost:9143")
           .allowedMethods("GET", "POST", "PUT", "DELETE")
           .allowedHeaders("*");
}
~~~

After that, please re-build the whole project and run this application.
Then, you could check the swagger at http://localhost:[backend_port]/doc.html#/default/.

### Frontend
- Please unzip the frontend.zip.
- Run “npm install” the terminal.
- Run 
~~~ sh
sh run.sh [backend_port] [front_end_port]
~~~
in the terminal. Please make sure that the backend port number matched with the backend. And the frontend is registered in the WebMvcConfig.class
- Please go http://localhost:[frontend_port]/login to start playing
- Admin Account (R U Hungry, Zxl010128)
