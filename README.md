# modish-log

MODISH LOG/INVENTORY

Run the following command in the root directory:

**To run the app together with docker compose, ensure there is database, backend and frontend set up in the docker compose file**

`docker-compose up --build`

subsequentely run:

`docker-compose up`

Backend: http://localhost:3001

Frontend: http://localhost:3000


**To run the app seperately**

- To run the database, comment out the backend and frontend docker setups, then from the root folder, run for database:

`docker-compose up`

- For backend, cd into backend folder and run:

`npm run start:dev`

- For frontend, cd into frontend folder and run:

`nmp start`

**Hosted on railway**

- modish-log-production.up.railway.app
- REACT_APP_API_URL=https://modish-log-production.up.railway.app

**Swagger Documentation**

Visit http://localhost:3001/api to view the Swagger UI.

# modish-inventory

## User

- User can create/add sale ✅
- User can get all sales ✅
- User can get a sale ✅
- User can edit sale ✅
- User can delete sale ✅
- User can see sale history of a product
- User can see all products with just only quantity left column
- User can see a product with just only quantity left column alone

## Admin

- Admin can create/add product ✅
- Admin can get a product ✅
- Admin can get all products ✅
- Admin can edit a product ✅
- Admin can delete product ✅
- can add quantities to existing product 

## User Auth

- Admin can create a user  ✅
- Admin can get users  ✅
- Admin can get a user  ✅
- User can login  ✅
- User can log out  ✅
- Admin can delete/deactivate user 
- User can reset password


:TODO

- Get users list ui
- Admin edit user (role, reset password) action on user list


**MVP**
- Edit sale - to add/remove product price or color/size ✅
- Update sale status to paid/unpaid ✅
- Add comments to sale ✅
- Delete sale ✅
- Delete product ✅
- Edit / Update product ✅
- Enter Counted goods and automatic stock balance - should tell which is short or more. ✅
- Product price update should not affect previous sales value. 

**EXTRAS**
- Total value of stock/goods remaining 
- Total sales per day 
- Filter sales by date
- Attach payment receipt to sale

**TO CHECK IF IMPLEMENTED**
- Create history to show sales date change in stock and all
- validate that sale quantity can not be zero
- validate that negative value can not be entered for create sale and product
- validate that negative value can not be entered for update product


**To run Migration**

Run the command 

`npm run typeorm:migration:generate -- ./src/migrations/Filename`

Example:
`npm run typeorm:migration:generate -- ./src/migrations/UpdateProductPriceColumn`

Then after the migration file is generated, run

`npm run typeorm:migration:run`

*POST /products*
```
{
  "color": "Akala",
  "size": "0.5mm by 21mm",
  "quantity": 100,
  "price": 10.50
}
```

```
const product = this.productsRepository.create({
  color: 'Akala',
  size: '0.5mm by 21mm',
  price: 10.50, // Must have 2 decimal places
  quantity: 100,
});
await this.productsRepository.save(product);
```

*Updating a Product*

```
await this.productsRepository.update(id, {
  price: 15.75, // Must have 2 decimal places
});
```

*POST /sales*

```
{
  "productId": 1,
  "quantitySold": 5
}
```

*POST /users*

```
{
  "username": "admin",
  "password": "password123",
  "role": "Admin"
}
```