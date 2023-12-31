# School Management

## Description

This is a basic example of a full stack app using express and pure mysql for the backend. And for the frontend I used Vanilla JS, HTML, CSS

Demo Video: https://youtu.be/rZU44fJLFZ4

## Instructions

### Step 1:

Open this project then, Go to the server directory of the project in your termial. Path (/schoolmanagement/server). This would install dependices needed
Then once in server directory in your termail type the command below

```
npm install
```

You would know that it worked if you have a node_modules folder in /server folder

### Step 2:

Go to the dbconfig.js file (/server/dbconfig.js).
On lines 6-9 put your mysql database creds. (Database used for step 3).

```
const connection = mysql.createConnection({
host: "localhost on dbconfig.js line 6",
user: "put username on dbconfig.js line 7",
password: "put password on dbconfig.js line 8",
database: "put database name on dbconfig.js line 9",
});
```

### Step 3:

After the connection has been made. Make sure your termial is still in the /server directory and then start the server with the command below:

```
node index.js
```

You'll know everything works if you see the text below in the termial:
```
Server started on port 3001
Connected to MySQL database
```

### Step 4:

Next step is to open the index.html file so that you could see the client side of the website
Go to your file directory and open the folder that contains the project
Then go the client folder and open the index.html file in your browser

For more help/information of how to open a HTML file: https://helpdeskgeek.com/how-to/open-an-html-file-in-google-chrome/

It should look like this if done right:

![image](https://github.com/luismolinuevo/schoolmanagement/assets/89353175/9aa8d2d5-5c52-42df-b66d-a6307c1fe207)


### Errors you may get:

"MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client"

Fix for this is steps below. This means there is a issue with node and your mysql connection

Execute the following query in MYSQL Workbench

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

Where root as your user localhost as your URL and password as your password

Then run this query to refresh privileges:

```
flush privileges;
```

Try connecting using node after you do so.

If that doesn't work, try it without @'localhost' part.

More info on why: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

