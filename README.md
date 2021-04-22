# WAMP_Y3Proj
# Final Report
 Bitcoin Exchange Platform


## 04/2021

##Content

1. Database structure

2. Backend

3. Frontend

4. Infrastructure

5. Security

6. Difficulties encountered

Sources Code :[https://github.com/HoiDam/WAMP\_Y3Proj](https://github.com/HoiDam/WAMP_Y3Proj)

Pdf version is also uploaded

## 1. Database Structure

- Done at Mar 8
- 5 tables

1. Wallet (Storing wallet data)
2. User (Storing user data e.g., email, password)
3. Session (Storing login session data, e.g. token)
4. Transaction (storing transaction between 2 users&#39; data)
5. Address (Storing bitcoin data e.g. public key, private key

![](RackMultipart20210422-4-1m05qhy_html_e6c8e79dab06b49.png)

## 2. Backend
  1. Backend Structure

- Done on Mar 15
- Using PHP 5.6.40
- Framework:

Slim 3.0 (Routing RESTful API)

Blockcypher PHP client 1.5 (required official API)

- Hosting at Apache

![](RackMultipart20210422-4-1m05qhy_html_1f169a8a89909adf.png)

  1. Backend Coding (Folder structure)

- Under www/php storing the backend code
- ![](RackMultipart20210422-4-1m05qhy_html_4e2f9b2f25e1ed6f.png)
- index.php under Public storing api routes
- ![](RackMultipart20210422-4-1m05qhy_html_da1eb32f8e58b5d8.png)
- .htaccess restructure the route of Apache
- Function folder storing the function that api will call

![](RackMultipart20210422-4-1m05qhy_html_db4bb2ab1417b2e8.png)

  1. Backend Coding (index.php)

- We will call the api by (hostname/php/public) + the path + the ,method(post/get?)
- With the json format + header to transmit the data
- If the connection okay, the api return two parameters msg(depends , usually data) , status (success/ failed)
- ![](RackMultipart20210422-4-1m05qhy_html_79ea867def6150fb.png)
- ![](RackMultipart20210422-4-1m05qhy_html_af67e1f747e46fb9.png)

  1. Backend Coding (function folder)

The function will be called when the parameters is valid

![](RackMultipart20210422-4-1m05qhy_html_f624fd1bf673660d.png)

![](RackMultipart20210422-4-1m05qhy_html_4b96aa6791c2ec01.gif)/public/index.php

![](RackMultipart20210422-4-1m05qhy_html_c38bf3486e726f10.png)

![](RackMultipart20210422-4-1m05qhy_html_4b96aa6791c2ec01.gif)/function/blockcypher.php ![](RackMultipart20210422-4-1m05qhy_html_1b33580b65c47cfa.png)

## 3. Frontend
  1. Frontend Structure

- Done at Apr 5
- Using HTML5+CSS+JavaScript
- Main Framework:

React Redux (Control State, Login etc)

React Router (Control URL pathing)

Material UI (CSS framework, UI design)

- Hosting at Apache

  1. Frontend Coding (Folder Structure before built)

- This is only view for development
- Codes storing at src (most of them are .js)
- Folder actions,auth,services,sagas,store doing the Redux to control login/ register state
- Utils storing service like cookie
- Container store routing setting
- Main storing main page

![](RackMultipart20210422-4-1m05qhy_html_d2e424f78f9484c2.png)

![](RackMultipart20210422-4-1m05qhy_html_4b96aa6791c2ec01.gif)src folder

![](RackMultipart20210422-4-1m05qhy_html_2b617f371b0f6006.png)

  Frontend Coding (Folder Structure after built)

- Under www/php storing the frontend code
- index.html storing the main structure
- .htaccess restructure the route of Apache
- Since this is generated by webpack not many explanations here
- ![](RackMultipart20210422-4-1m05qhy_html_8c531acde832919a.png)

  Frontend (cookie)

- Storing cookie as a function
- If need then call setCookie or getcookie
- The function using vanilla cookie api (document.cookie) to generate
- Default expire time = 2hours (same as db setting)
- ![](RackMultipart20210422-4-1m05qhy_html_817587e98dc9527d.png)

  Frontend (Routing)

- Mainly 4 routes before login success
- /app would be the base of all routes

1. / -\&gt; welcome page
2. /login -\&gt; login page
3. /register -\&gt; register page
4. /register/confirm -\&gt; register success page

- The fifth route would be login success redirect /main

![](RackMultipart20210422-4-1m05qhy_html_3d39b4d396bc7260.png)

   Frontend (Routing 2)

- Mainly 4 routes after login success
- /app would be the base of all routes

1. /home -\&gt; home page
2. /daw -\&gt; deposit/withdrawl page
3. /bas -\&gt; buy/sell page
4. /setting-\&gt; setting page

![](RackMultipart20210422-4-1m05qhy_html_542c2710a9179df2.png)

  Frontend (Welcome page)

- Two options
- Login / register

![](RackMultipart20210422-4-1m05qhy_html_e066feba4b23a70d.png)

  1. Frontend (Login page)

- Login with

Email address

Password

Valid reCAPTCHA

- If success -\&gt; redirect main page (with received token from api)
- (token stored at cookie) ![](RackMultipart20210422-4-1m05qhy_html_fe48723703d09af2.png)
- If failed -\&gt; show error message
- ![](RackMultipart20210422-4-1m05qhy_html_468eb2fdf169a6b0.png)

  Frontend (Register page)

• Register with

Email address

Password (double confirm)

Nickname

address

Valid reCAPTCHA ![](RackMultipart20210422-4-1m05qhy_html_a68134a8d94ea087.png)

• If success -\&gt; redirect register success page

• If failed -\&gt; show error message

  1. Frontend (Register success page)

- Success screen

![](RackMultipart20210422-4-1m05qhy_html_b0c332d169d5a699.png)

  1. Frontend (homepage)

All page with /main can access the left bar

Logout button clear cookie + redirect to path /app/

![](RackMultipart20210422-4-1m05qhy_html_54f7d83dbbf9e9d3.png)

  1. Frontend (deposit and withdrawal page)

- The upper showing the current funds the user have
- Insert amount and drag a file to deposit
- ![](RackMultipart20210422-4-1m05qhy_html_487ecbd713b0f9c8.png)

  1. Frontend (deposit and withdrawal page)

- Insert amount to withdrawal
- If success -\&gt; able to download invoice (pdf)
- ![](RackMultipart20210422-4-1m05qhy_html_64ad24b631ece94a.png)

  1. Invoice

Showing Address Email etc

![](RackMultipart20210422-4-1m05qhy_html_8e5a9c25f038fb59.png)

  1. Frontend (buy and sell page)

- 3 parts

1: transaction history

2: create transaction

3: current balance check

![](RackMultipart20210422-4-1m05qhy_html_ad3328bacbbc6119.png)

  1. Frontend (buy and sell page) Transaction history

- Showing all transaction history that related to the user
- Buy/sell
- From which address?
- To which address?
- Bitcoin amount?
- Funds amount?
- Status?

If (requested and from\_user -\&gt; can cancel)

if (requested and to\_user -\&gt; can accept or decline)

![](RackMultipart20210422-4-1m05qhy_html_d15c4e03370f8e09.png)

- Other relevant info

All real transactions happen when the to\_user pressed accept.

If not , nothing happen

![](RackMultipart20210422-4-1m05qhy_html_af022c2ee121f5f2.png)

  Frontend (buy and sell page) Create Transaction

- Input the following data to create a transaction
- If the target address is belongs to someone, that user can view the record just like above mentioned
- All info is under validation e.g., amounts must \&gt;0
- ![](RackMultipart20210422-4-1m05qhy_html_7035118370bb6036.png)
  
  Frontend (buy and sell page) Balance Query

- Showing balance
- Insert the address to query address detail E.g., n1s9……
- ![](RackMultipart20210422-4-1m05qhy_html_a83636b675503b1b.png)
- ![](RackMultipart20210422-4-1m05qhy_html_ead43985e923578e.png)
- ![](RackMultipart20210422-4-1m05qhy_html_8a8b35d72ac6d524.png)

  Frontend (setting page)

- 3 parts

1: profile info displays Not explaining 1 cause too simple

2: change password

3: wallet address binding

![](RackMultipart20210422-4-1m05qhy_html_4830110ba2b9a84c.png)

  1. Frontend (setting page) Change password

- Simple change password function

![](RackMultipart20210422-4-1m05qhy_html_561f460ba8ca538b.png)

- Insert old password
- Double insert new password If not match pop error

![](RackMultipart20210422-4-1m05qhy_html_c27cdea75563d88b.png)

  Frontend (setting page) Wallet address binding

- Showing wallet list
- Add wallet / delete wallet function
- After pressing the red circle detail function button -\&gt;

go watch wallet address binding 2

![](RackMultipart20210422-4-1m05qhy_html_ac01cc62645dcc2b.png)

  Frontend (setting page) Wallet address binding 2

- You can see the addresses in wallet 1
- You can delete address
- After pressing the red circle add function button -\&gt;

go watch wallet address binding 3

![](RackMultipart20210422-4-1m05qhy_html_3a3fd6d074a50caa.png)

  Frontend (setting page) Wallet address binding 3

- Add your address by this 4 parameters

1. Bitcoin address
2. Private key
3. Public key
4. Wif

![](RackMultipart20210422-4-1m05qhy_html_38a78f1f32482c8c.png)

## 4. Infrastructure

- Your public IP 218.253.12.22
- Exposed Kali Attacker VM SSH port at public (if you changed from 22/tcp to something else) 22
- Kali Attacker VM&#39;s local IP (bridged to your home router network) 192.168.31.109
- Host&#39;s IP (also should be under your home router network) 192.168.31.19
- pfSense NIC1 (WAN) IP (should be under your home router network, you should be able to access to your Web Application by typing this IP at your Host) 192.168.31.218
- Web Server / DB VM (optional) local IP (under your pfSense LAN) 192.168.153.1

![](RackMultipart20210422-4-1m05qhy_html_f5f7ccc23269b7d2.png)

## 5. Security
  1. Security (pfsense)

- Only port forward 443 in

![](RackMultipart20210422-4-1m05qhy_html_a2380cb7fbb1c049.png)

- Changing rules in 443
- Prevent flooding

![](RackMultipart20210422-4-1m05qhy_html_bf9b4b03735297b6.png)

  1. Security (SSL)

![](RackMultipart20210422-4-1m05qhy_html_be8a083d13b5c26a.png)

- Binding ssl to my domain name to Secure
- Domain sponsored by : freenom.com

![](RackMultipart20210422-4-1m05qhy_html_1086efe18bd4150f.png)

- SSL sponsored by : ssl.com

![](RackMultipart20210422-4-1m05qhy_html_7252e91eb61cce8f.png)

- SSL files installed in WAMP:

![](RackMultipart20210422-4-1m05qhy_html_218715c9223661e6.png)

  1. Security (Apache Defend)

- Download mod (security library from open source web)

![](RackMultipart20210422-4-1m05qhy_html_4dc3679d08ab380c.png)

- Move the file in this folder
- ![](RackMultipart20210422-4-1m05qhy_html_805e80ef4641725c.png)

Change code in httpd.conf

![](RackMultipart20210422-4-1m05qhy_html_d1a9e083679e914.png)

Reqtime\_module can defend most of the HTTP attack

Evasive2 + pfsense firewall can defend flooding (TCP/IP) attack

  1. Security (Kali Penetration Test)

![](RackMultipart20210422-4-1m05qhy_html_813aa59ea383dc6a.png)

Flooding pass

![](RackMultipart20210422-4-1m05qhy_html_1126257506c88e07.png)

slowhttptest -c 1000 -H -g -o my\_header\_stats -i 10 -r 200 -t GET -u https://192.168.31.218 -x 24 -p 3

Pass at 20s

![](RackMultipart20210422-4-1m05qhy_html_c913fe148bccc9a.png)

slowhttptest -c 3000 -B -g -o my\_body\_stats -i 110 -r 200 -s 8192 -t FAKEVERB -u https://192.168.31.218 -x 10 -p 3

Pass at 80s

Web Vulnerabilities Check

Before :

![](RackMultipart20210422-4-1m05qhy_html_393aa6178c80d2e.png)

After :

![](RackMultipart20210422-4-1m05qhy_html_c2d5f101467744d1.png)

Fix 1 :

Remove the script not belong to my site (reference script)

Fix 2 :

Adding the content type

![](RackMultipart20210422-4-1m05qhy_html_9ba9af928d71a1d0.png)

Fix 3 : Remove library viewable to public

## 6. Difficulties encountered

Difficulty 1 : Blockcypher php library deprecated

Since the version too old and it become private repo in github, we cant use composer install to install the library

Solution :

Manually install with changing config in the library file

Used 2 days to research and change

Difficulty 2 : Web routing problem

NPM webpack host is different from apache host

Solution :

Test every route combination and adding basename to the /app/ = success

Diffculty 3 : home router port forwarding

Don&#39;t know why the port forwarding is set but still not working

Solutions:

Find out that xiaomi router have to turn off UPnP setting .
